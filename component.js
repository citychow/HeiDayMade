export const Navbar = (currentPage) => 
`<div class="container">
    <nav class="navbar navbar-expand-lg fixed-top bg-body-tertiary navbar-dark gradient-background" aria-label="Main navigation">
        <div class="container-fluid">
          <a class="navbar-brand" href="./index.html">HeiDayMade</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" id="navbarSideCollapse" aria-expanded="true" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
      
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              
              <li class="nav-item">
                <a class="nav-link ${currentPage === 'About' ? 'active' : ''}" href="./About-me.html">About</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle ${currentPage === 'Gallery' ? 'active' : ''}" href="./Gallery-Main.html" data-bs-toggle="dropdown" aria-expanded="false">Gallery</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="./Gallery-Main.html">Crochet</a></li>
                  <li><a class="dropdown-item" href="./Gallery-Beads.html">Beads</a></li>
                  <li><a class="dropdown-item" href="./Gallery-Leather.html">Leather</a></li>
                  <li><a class="dropdown-item" href="./Gallery-Others.html">Others</a></li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link ${currentPage === 'Project' ? 'active' : ''}" href="./Project-Main.html">Project</a>
              </li>
              <li class="nav-item">
                <a class="nav-link ${currentPage === 'Form' ? 'active' : ''}" href="./Form-Main.html">Feedback</a>
              </li>
            </ul>
            ${currentPage === 'Gallery' ? `
                <form class="d-flex ms-auto" role="search" id="search-form">
                  <input class="form-control me-2" type="search" placeholder="Search" id="search-input" aria-label="Search">
                </form>
            ` : ''}
          </div>
        </div>
      </nav>
  </div>`;


export const Footer = () => `
      <div class="container">
          <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <p class="col-md-4 mb-0 text-body-secondary">©HeiDayMade ${new Date().getFullYear()}</p>

            <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none" aria-label="Bootstrap">
              <svg class="bi me-2" width="40" height="32" aria-hidden="true"><use xlink:href="#bootstrap"></use></svg>
            </a>
        
            <ul class="nav col-md-4 justify-content-end">
              <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Home</a></li>
              <li class="nav-item"><a href="./About-me.html" class="nav-link px-2 text-body-secondary">About</a></li>
              <li class="nav-item"><a href="./Gallery-Main.html" class="nav-link px-2 text-body-secondary">Gallery</a></li>
              <li class="nav-item"><a href="./Project-Main.html" class="nav-link px-2 text-body-secondary">Project</a></li>
              <li class="nav-item"><a href="./Form-Main.html" class="nav-link px-2 text-body-secondary">Feedback</a></li>
            </ul>
          </footer>
        </div>`;