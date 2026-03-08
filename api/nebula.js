const NEBULA_BASE = "https://api.utdnebula.com";
const NEBULA_KEY = "AIzaSyB2zQIwK0gowd-Pkum4SHVzRVK7-PrwlUY";
const headers = { "x-api-key": NEBULA_KEY, "Accept": "application/json" };

export async function fetchAllCourses(maxPages = 10) {
  const all = [];
  let offset = 0;
  for (let i = 0; i < maxPages; i++) {
    try {
      const res = await fetch(`${NEBULA_BASE}/course?offset=${offset}`, { headers });
      const json = await res.json();
      if (!json.data || json.data.length === 0) break;
      all.push(...json.data);
      offset += 20;
      await sleep(400);
    } catch (e) { break; }
  }
  return all;
}

export async function searchCourse(code) {
  try {
    const [subject, number] = code.split(" ");
    const res = await fetch(
      `${NEBULA_BASE}/course?subject_prefix=${subject}&course_number=${number}`,
      { headers }
    );
    const json = await res.json();
    return json.data?.[0] || null;
  } catch (e) { return null; }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
