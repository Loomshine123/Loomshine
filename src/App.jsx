import './App.css'

function App() {
  return (
    <div className="app-container">
      <img
        src="/banner.png"
        alt="Loom Shine Coming Soon Banner"
        className="main-banner"
        onError={(e) => {
          e.target.onerror = null;
          e.target.style.display = 'none';
          e.target.insertAdjacentHTML('afterend', '<h2 style="color: #001A41; font-family: sans-serif;">Please save the banner image as banner.jpg in the public folder.</h2>');
        }}
      />
    </div>
  )
}

export default App
