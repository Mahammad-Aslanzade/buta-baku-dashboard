export const sortForPosition = (data, acsending = true) => {
   return acsending ? data.sort((a, b) => a.position - b.position) : data.sort((a, b) => b.position - a.position);
};

export const findFirstGap = (objects) => {
   const positions = objects.map((obj) => obj.position).sort((a, b) => a - b);

   for (let i = 0; i < positions.length - 1; i++) {
      if (positions[i + 1] > positions[i] + 1) {
         return positions[i] + 1; // Return the first missing number
      }
   }

   // If no gap is found, return the next number after the last position
   return positions[positions.length - 1] + 1;
};
