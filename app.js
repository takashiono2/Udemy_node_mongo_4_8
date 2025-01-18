const express = require('express');
const app = express();
const POAT = 3000;

app.get('/api/vi/tasks', (req, res) => {
  res.send('タスクを取得しました。');
});
app.post('/api/vi/tasks', (req, res) => {
  res.send('タスクを新規作成しました。');
});
app.get('/api/vi/tasks/:id', (req, res) => {
  res.send('特定のタスクを取得しました');
});
app.patch('/api/vi/tasks/:id', (req, res) => {
  res.send('特定のタスクを更新しました');
});
app.delete('/api/vi/tasks/:id', (req, res) => {
  res.send('特定のタスクを削除しました');
});

app.listen(POAT, console.log(`Server is running on port ${POAT}`));