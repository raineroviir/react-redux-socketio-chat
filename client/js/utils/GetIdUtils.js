export default function getId(data) {
  const newId = data.reduce((maxId, item) => {
    const { id } = item;
    return Math.max(maxId, +id) + 1;
  }, -1);
  return (newId !== -1) ? newId : 0;
}