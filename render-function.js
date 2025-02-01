export function handleSuccess(data) {
  return data
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery-item">
          <article class="card">
            <a class="card-link" href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
              <img class="card-image" src="${webformatURL}" alt="${tags}" />
            </a>
            <div class="card-container">
              <div class="card-item">
                <p class="card-title"><i class="fas fa-heart"></i> Likes</p>
                <p class="card-count">${likes}</p>
              </div>
              <div class="card-item">
                <p class="card-title"><i class="fas fa-eye"></i> Views</p>
                <p class="card-count">${views}</p>
              </div>
              <div class="card-item">
                <p class="card-title"><i class="fas fa-comment"></i> Comments</p>
                <p class="card-count">${comments}</p>
              </div>
              <div class="card-item">
                <p class="card-title"><i class="fas fa-download"></i> Downloads</p>
                <p class="card-count">${downloads}</p>
              </div>
            </div>
          </article>
        </li>`;
      }
    )
    .join('');
}