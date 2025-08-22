// ===============================
// United Seas - Live Crew Roster
// ===============================

// Add your Twitch Developer credentials here
const clientId = 'YOUR_TWITCH_CLIENT_ID';  // Replace with your Client ID
const token = 'YOUR_TWITCH_TOKEN';        // Replace with your App Access Token

// Crew Members - Add or remove members here
const crewMembers = [
  { name: 'Captain SiegePirate', twitch: 'siegepirate' },
  { name: 'Squidnuggette', twitch: 'squidnuggette_xl' },
  { name: 'Momma Flowerchu', twitch: 'flowerachu_xl' },
  { name: 'Mo', twitch: 'mo_xl' },
  { name: 'Pixxelair', twitch: 'pixxelair_xl' }
];

// Fetch status from Twitch API
async function fetchTwitchStatus(username) {
  try {
    const response = await fetch(`https://api.twitch.tv/helix/streams?user_login=${username}`, {
      headers: {
        'Client-ID': clientId,
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch Twitch data');
    const data = await response.json();
    return data.data.length > 0 ? data.data[0] : null;
  } catch (error) {
    console.error(`Error fetching data for ${username}:`, error);
    return null;
  }
}

// Update Crew Roster Section
async function updateCrewRoster() {
  const roster = document.getElementById('live-crew');
  if (!roster) {
    console.error('Error: No element with ID "live-crew" found in HTML.');
    return;
  }

  roster.innerHTML = '<p>Checking the seas for live streams...</p>';

  for (const member of crewMembers) {
    const stream = await fetchTwitchStatus(member.twitch);
    const div = document.createElement('div');
    div.className = 'crew-member';
    div.style.margin = '10px';
    div.style.padding = '10px';
    div.style.border = '1px solid #ffb700';
    div.style.borderRadius = '10px';
    div.style.backgroundColor = '#011622';

    if (stream) {
      div.innerHTML = `
        <strong style="color:#ffb700; font-size:18px;">${member.name}</strong>
        <p style="color:green; margin:5px 0;">LIVE NOW</p>
        <p style="font-size:14px; margin:5px 0;">${stream.title}</p>
        <a href="https://twitch.tv/${member.twitch}" target="_blank"
           style="color:#ffb700; text-decoration:none; font-weight:bold;">Watch Stream</a>
      `;
    } else {
      div.innerHTML = `
        <strong style="color:#ffb700; font-size:18px;">${member.name}</strong>
        <p style="color:gray; margin:5px 0;">Currently Offline</p>
      `;
    }

    roster.appendChild(div);
  }
}

// Initialize after page loads
document.addEventListener('DOMContentLoaded', updateCrewRoster);
