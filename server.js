import express from 'express';
import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Path to legal.db (check local or parent dir)
let dbPath = path.resolve(__dirname, 'legal.db');
if (!fs.existsSync(dbPath)) {
  dbPath = path.resolve(__dirname, '..', 'legal.db');
}

const db = new DatabaseSync(dbPath);

const VALID_ACTS = new Set(['BNS', 'BNSS', 'BSA', 'IPC', 'CRPC', 'IEA', 'COI', 'CPC', 'MVA', 'NIA']);

const ACT_DESCRIPTIONS = {
  BNS: 'The primary criminal code of India, replacing the IPC. It defines criminal offenses and their punishments.',
  BNSS: 'The primary procedural law for the administration of criminal justice in India, replacing the CrPC. It outlines procedures for investigation, arrest, and trial.',
  BSA: 'The primary law governing the admissibility of evidence in Indian courts, replacing the Indian Evidence Act.',
  IPC: 'The former primary criminal code of India (repealed and replaced by BNS).',
  CRPC: 'The former procedural law for criminal justice (repealed and replaced by BNSS).',
  IEA: 'The former law governing evidence admissibility (repealed and replaced by BSA).',
  COI: 'The supreme law of India, establishing the framework of fundamental political code, rights, and government structure.',
  CPC: 'The primary procedural law for the administration of civil proceedings in India.',
  MVA: 'The primary law regulating all aspects of road transport vehicles, including traffic rules and vehicle registration.',
  NIA: 'The law regulating Promissory Notes, Bills of Exchange and Cheques (frequently used for dishonour of cheques under Section 138).'
};

// Middleware
app.use(express.json());

// Enable CORS for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Helper validation
function validateAct(actCode) {
  if (!actCode) return { isValid: false, message: 'Act code is required.' };
  const upper = actCode.toUpperCase();
  if (!VALID_ACTS.has(upper)) {
    return { isValid: false, message: `Invalid act_code '${actCode}'. Valid codes: ${Array.from(VALID_ACTS).sort().join(', ')}` };
  }
  return { isValid: true, code: upper };
}

// 1. List Acts
app.get('/api/acts', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM acts ORDER BY act_code').all();
    const counts = db.prepare('SELECT act_code, count(*) as count FROM sections GROUP BY act_code').all();
    const countMap = Object.fromEntries(counts.map(c => [c.act_code, c.count]));

    const result = rows.map(r => ({
      ...r,
      total_sections: countMap[r.act_code] || 0,
      description: ACT_DESCRIPTIONS[r.act_code] || ''
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Act Info
app.get('/api/acts/:act_code', (req, res) => {
  const { isValid, code, message } = validateAct(req.params.act_code);
  if (!isValid) return res.status(400).json({ error: message });

  try {
    const act = db.prepare('SELECT * FROM acts WHERE act_code = ?').get(code);
    if (!act) return res.status(404).json({ error: `Act ${code} not found.` });

    const countRow = db.prepare('SELECT count(*) as count FROM sections WHERE act_code = ?').get(code);
    res.json({
      ...act,
      total_sections: countRow ? countRow.count : 0,
      description: ACT_DESCRIPTIONS[code] || ''
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Get Section
app.get('/api/section/:act_code/:section_number', (req, res) => {
  const { isValid, code, message } = validateAct(req.params.act_code);
  if (!isValid) return res.status(400).json({ error: message });

  const secNum = String(req.params.section_number);

  try {
    const section = db.prepare(`
      SELECT chapter_number, chapter_title, section_number, section_title, text 
      FROM sections 
      WHERE act_code = ? AND section_number = ?
    `).get(code, secNum);

    if (!section) {
      return res.status(404).json({ error: `Section ${secNum} not found in ${code}.` });
    }

    const act = db.prepare('SELECT status, replaced_by FROM acts WHERE act_code = ?').get(code);
    const result = { ...section, act_code: code };
    if (act && act.status === 'repealed') {
      result.note = `This Act is repealed and no longer applies to new cases. It was replaced by ${act.replaced_by}.`;
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. List Sections
app.get('/api/sections/:act_code', (req, res) => {
  const { isValid, code, message } = validateAct(req.params.act_code);
  if (!isValid) return res.status(400).json({ error: message });

  try {
    const rows = db.prepare(`
      SELECT chapter_number, section_number, section_title 
      FROM sections 
      WHERE act_code = ?
      ORDER BY id
    `).all(code);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Get Chapter
app.get('/api/chapter/:act_code/:chapter_number', (req, res) => {
  const { isValid, code, message } = validateAct(req.params.act_code);
  if (!isValid) return res.status(400).json({ error: message });

  if (['CPC', 'MVA', 'COI'].includes(code)) {
    return res.json({ message: `Act ${code} does not have chapter grouping in this dataset.` });
  }

  const chNum = String(req.params.chapter_number);

  try {
    const rows = db.prepare(`
      SELECT chapter_number, chapter_title, section_number, section_title, text 
      FROM sections 
      WHERE act_code = ? AND chapter_number = ?
      ORDER BY id
    `).all(code, chNum);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: `Chapter ${chNum} not found in ${code}.` });
    }

    res.json({
      chapter_number: chNum,
      chapter_title: rows[0].chapter_title,
      total_sections_in_chapter: rows.length,
      sections: rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Section Range
app.get('/api/range/:act_code/:start/:end', (req, res) => {
  const { isValid, code, message } = validateAct(req.params.act_code);
  if (!isValid) return res.status(400).json({ error: message });

  const startSec = String(req.params.start);
  const endSec = String(req.params.end);

  try {
    const startRow = db.prepare('SELECT id FROM sections WHERE act_code = ? AND section_number = ?').get(code, startSec);
    const endRow = db.prepare('SELECT id FROM sections WHERE act_code = ? AND section_number = ?').get(code, endSec);

    if (!startRow) return res.status(404).json({ error: `Start section ${startSec} not found in ${code}.` });
    if (!endRow) return res.status(404).json({ error: `End section ${endSec} not found in ${code}.` });

    let startId = startRow.id;
    let endId = endRow.id;
    let note = null;

    if (startId > endId) {
      const temp = startId;
      startId = endId;
      endId = temp;
      note = 'Start section appeared after end section. The range was automatically reversed.';
    }

    const rows = db.prepare(`
      SELECT chapter_number, chapter_title, section_number, section_title, text 
      FROM sections 
      WHERE act_code = ? AND id >= ? AND id <= ?
      ORDER BY id
    `).all(code, startId, endId);

    const result = { sections: rows };
    if (note) result.note = note;
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Full Act Paginated
app.get('/api/full-act/:act_code', (req, res) => {
  const { isValid, code, message } = validateAct(req.params.act_code);
  if (!isValid) return res.status(400).json({ error: message });

  let page = parseInt(req.query.page) || 1;
  if (page < 1) page = 1;

  const pageSize = 50;
  const offset = (page - 1) * pageSize;

  try {
    const totalRow = db.prepare('SELECT COUNT(*) as count FROM sections WHERE act_code = ?').get(code);
    const totalSections = totalRow.count;
    const totalPages = Math.ceil(totalSections / pageSize);

    if (totalPages > 0 && page > totalPages) {
      return res.json({
        note: `Limit crossed! You requested page ${page}, but ${code} only has ${totalPages} pages.`,
        current_page: page,
        total_pages: totalPages,
        total_sections_in_act: totalSections,
        has_next_page: false,
        sections: []
      });
    }

    const rows = db.prepare(`
      SELECT chapter_number, chapter_title, section_number, section_title, text 
      FROM sections 
      WHERE act_code = ?
      ORDER BY id
      LIMIT ? OFFSET ?
    `).all(code, pageSize, offset);

    res.json({
      current_page: page,
      total_pages: totalPages,
      total_sections_in_act: totalSections,
      has_next_page: page < totalPages,
      sections: rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Ranked Keyword & FTS5 Search
app.get('/api/search', (req, res) => {
  const query = (req.query.query || '').trim();
  const actCodeParam = req.query.act_code ? req.query.act_code.trim() : null;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required.' });
  }

  let codeFilter = null;
  if (actCodeParam) {
    const { isValid, code, message } = validateAct(actCodeParam);
    if (!isValid) return res.status(400).json({ error: message });
    codeFilter = code;
  }

  try {
    const safeQuery = query.startsWith('"') ? query : `"${query.replace(/"/g, '')}"`;
    const limit = 20;

    let sql = `
      SELECT s.act_code, s.chapter_number, s.section_number, s.section_title, s.text
      FROM sections_fts fts
      JOIN sections s ON fts.rowid = s.id
      WHERE sections_fts MATCH ?
    `;
    const params = [safeQuery];

    if (codeFilter) {
      sql += ' AND s.act_code = ?';
      params.push(codeFilter);
    }

    sql += `
      ORDER BY (s.section_title COLLATE NOCASE = ?) DESC,
               (s.section_title LIKE '%' || ? || '%') DESC,
               bm25(sections_fts, 10.0, 1.0)
      LIMIT ?
    `;
    params.push(query, query, limit + 1);

    const rows = db.prepare(sql).all(...params);
    const hasMore = rows.length > limit;
    const results = hasMore ? rows.slice(0, limit) : rows;

    res.json({
      returned_matches: results.length,
      has_more: hasMore,
      query,
      act_code: codeFilter,
      results
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 9. Stats
app.get('/api/stats', (req, res) => {
  try {
    const totalRow = db.prepare('SELECT count(*) as total FROM sections').get();
    const actCounts = db.prepare('SELECT act_code, count(*) as count FROM sections GROUP BY act_code ORDER BY act_code').all();
    res.json({
      total_sections: totalRow.total,
      act_counts: actCounts
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve frontend build if dist exists
const distPath = path.resolve(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`⚖️  Justicia Legal API server running on http://localhost:${PORT}`);
});
