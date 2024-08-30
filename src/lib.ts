import { Photo } from "./components/card";

const accessKey = "LvUcxTAcQiqCcgwSVytdZpJ9o6CL3ZFN3EJ5d9a1Iv0";

export const getPhots = async (accessKey: string, limit: number):Promise<Photo> => {
  return await fetch(
    `https://api.unsplash.com/photos?page=1&per_page=${limit}&client_id=${accessKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      let photos: Array<string | any> = [];
      data.forEach((photo) => {
        photos.push({
          slug: photo.slug,
          title: photo.alt_description,
          likes: photo.likes,
          created_at: photo.created_at,
          url: photo.urls.full,
          download: photo.links.download,
          color: photo.color,
          user: {
            name: photo.user.name,
            url: photo.user.profile_image.large
          }
        });
      });      
      return photos;
    })
    .catch((error) => {
      console.error("Error fetching photos:", error);
    });
};

export const getByCategory = async (accessKey: string, category: string):Promise<Photo> => {
  return await fetch(
    `https://api.unsplash.com/search/photos?page=1&per_page=20&query=${encodeURIComponent(
      category
    )}&client_id=${accessKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      let photos: Array<string | any> = [];
      data.results.forEach((photo) => {
        photos.push({
          slug: photo.slug,
          title: photo.alt_description,
          likes: photo.likes,
          created_at: photo.created_at,
          url: photo.urls.full,
          download: photo.links.download,
          color: photo.color,
          user: {
            name: photo.user.name,
            url: photo.user.profile_image.large
          }
        });
      });   
         
      return photos;
    })
    .catch((error) => {
      console.error("Error fetching photos:", error);
    });
};


// Function to search photos by keyword on Unsplash
export async function searchUnsplashPhotos(keyword: string, page: number = 1, perPage: number = 20): Promise<any> {
  const apiUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keyword)}&page=${page}&per_page=${perPage}&client_id=${accessKey}`;

  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    
    const data = await response.json();
    let photos: Array<string | any> = [];
      data.results.forEach((photo) => {
        photos.push({
          slug: photo.slug,
          title: photo.alt_description,
          likes: photo.likes,
          created_at: photo.created_at,
          url: photo.urls.full,
          download: photo.links.download,
          color: photo.color,
          user: {
            name: photo.user.name,
            url: photo.user.profile_image.large
          }
        });
      });   
      console.log(data);
      
         
      return photos;
  } catch (error) {
    console.error('Error fetching photos:', error);
    return null;
  }
}