export default async function decorate(block) {
  const img = block.querySelector('img');
  if (img) {
    img.loading = 'eager';
  }
}
