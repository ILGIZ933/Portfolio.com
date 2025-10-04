export const addLog = async (date) => {
  try {
    const res = await fetch('http://localhost:3001/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date })
    });

    if (!res.ok) throw new Error('Ошибка при добавлении лога');

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
