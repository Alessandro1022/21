// src/appInit.js
function getInfluencerId() {
  const params = new URLSearchParams(window.location.search);
  const influencerId = params.get('influencer');
  if (influencerId) {
    localStorage.setItem('influencer_id', influencerId);
  }
}

getInfluencerId();
