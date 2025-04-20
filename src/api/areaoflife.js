export async function getAreasOfLife({ signal }) {
  const response = await fetch('http://localhost:3000/api/areasoflife', {
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch AreasOfLife");
  }

  const { areasOfLife } = await response.json();

  return areasOfLife;
};
