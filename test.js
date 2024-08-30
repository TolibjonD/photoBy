const accessKey = 'LvUcxTAcQiqCcgwSVytdZpJ9o6CL3ZFN3EJ5d9a1Iv0';

const getByCategory = (accessKey, category) => {
  fetch(
    `https://api.unsplash.com/search/photos?page=1&per_page=20&query=${encodeURIComponent(
      category
    )}&client_id=${accessKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      let photos = [];      
      data.results.forEach((photo) => {
        photos.push({
          slug: photo.slug,
          title: photo.alt_description,
          likes: photo.likes,
          created_at: photo.created_at,
          url: photo.urls.full,
        });
      });
      console.log(photos);
            
      return photos;
    })
    .catch((error) => {
      console.error("Error fetching photos:", error);
    });
};
getByCategory(accessKey, 'NATURE')