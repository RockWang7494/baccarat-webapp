export function predictNext(history) {
  if (!history || history.length < 2) return 'unknown';

  const last = history[history.length - 1].result;
  const secondLast = history[history.length - 2].result;

  if (last === secondLast) {
    return last; // 預測延續趨勢
  } else {
    return 'banker'; // 預測反轉
  }
}
