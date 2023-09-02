const commentContainer = document.querySelector('.comment-container');

function createInputBox() {
  const div = document.createElement('div');
  div.classList.add('comment-details');

  div.innerHTML = `
  <input type="text" class="input" placeholder="Add Comment" />
  <button class="btn submit">Submit</button>
  `;

  return div;
}

function addReply(comment) {
  const div = document.createElement('div');
  div.classList.add('comment');

  div.innerHTML = `
          <div class="card">
            <span class="text">${comment}</span>
            <span class="reply">Add Reply</span>
          </div>
        `;

  return div;
}

commentContainer.addEventListener('click', (e) => {
  const replyClicked = e.target.classList.contains('reply');
  const submitClicked = e.target.classList.contains('submit');
  const closestCard = e.target.closest('.comment');

  if (replyClicked) {
    closestCard.appendChild(createInputBox());
  }

  if (submitClicked) {
    const commentDetails = e.target.closest('.comment-details');
    const comment = commentDetails.children[0].value;
    if (comment) {
      closestCard.appendChild(addReply(comment));
    }
    commentDetails.remove();
  }
});
