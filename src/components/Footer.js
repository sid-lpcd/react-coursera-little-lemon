import Logo from '../images/Logo.svg'

function Footer() {
  return (
    <footer className='container align-items-start'>
      <div className='col-3 align-items-center justify-content-center'>
        <img src={Logo}></img>
      </div>
      <div className='col-3'>
        <p className='title'>Footer Navigation</p>
        <ul>
          <li><a href=''>Home</a></li>
          <li><a href=''>About</a></li>
          <li><a href=''>Menu</a></li>
          <li><a href=''>Reservations</a></li>
          <li><a href=''>Order Online</a></li>
          <li><a href=''>Login</a></li>
        </ul>
      </div>
      <div className='col-3'>
        <p className='title'>Contact</p>
        <ul>
          <li><a href=''>Address</a></li>
          <li><a href=''>Phone Number</a></li>
          <li><a href=''>Email</a></li>
        </ul>
      </div>
      <div className='col-3'>
        <p className='title'>Social Media Links</p>
        <ul>
          <li><a href=''>Instagram</a></li>
          <li><a href=''>Facebook</a></li>
          <li><a href=''>LinkedIn</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
