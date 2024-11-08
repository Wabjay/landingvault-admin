export function createSlug(str: string) {
    return str
      .toLowerCase() // Convert to lowercase
      .replace(/[^\w\s-]/g, '') // Remove non-word characters (excluding spaces and dashes)
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .replace(/--+/g, '-') // Replace consecutive dashes with a single dash
      .trim(); // Trim any leading or trailing spaces or dashes
  }
  