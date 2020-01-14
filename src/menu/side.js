import React from 'react';
import con from '../api/connection';
import {Link} from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars';
class side extends React.Component {
  constructor(){
    super();
    this.state = {
      user:JSON.parse(localStorage.user),
      height:0
    }
    this.sidebarHeight = window.innerHeight - 100;
  }
  componentDidMount() {
    let divScope = document.querySelector('.main-sidebar .sidebar').querySelectorAll(':scope > div');
    let sidebarHeight = this.sidebarHeight - (divScope[0].offsetHeight + divScope[1].offsetHeight);
    this.setState({
      height: sidebarHeight
    });
  }
  render() {
    return (
      <aside className="main-sidebar fixed offcanvas">
        <section className="sidebar">
          <div className="w-80px my-2 mx-3">
            <div className="d-flex m-auto align-items-center">
              <Link to="/" className="col-auto pl-0">
                <img src={con.img+'/logo.png'} alt="img" className="hpx-30 border border-2 radius-30 ppx-1" />
              </Link>
              <Link to="/" className="col-auto text-white px-0">SISKA</Link>
              <div className="col text-right px-0">
                <span className="toggle-canvas w-100 text-right"> <i className="la la-times text-white f-14" /> </span>
              </div>
            </div>
          </div>
          <div className="user-panel py-3 mb-2">
            <div className="row">
              <div className="col-12 text-center mb-2">
                <Link to="/profile">
                  <img className={"user_avatar_sm border-primary ppx-2 "+(this.state.user.avatar ? '' : 'p-2')} src={con.img+'/user/thumb/'+(this.state.user.avatar || '../../user.png')+'?'+Date.now()} alt="img"/>
                </Link>
              </div>
              <div className="col-12 text-center">
                <Link to="/profile">
                  <p className="text-white mt-0 mb-1 bolder text-nowrap text-capitalize">{this.state.user.nama}</p>
                  <p className="text-white bolder f-8 m-0">{this.state.user.nis}</p>
                </Link>
              </div>
            </div>
            <div className="clearfix" />
          </div>
          <Scrollbars style={{ height: this.state.height+'px' }} autoHide>
            <ul className="sidebar-menu" id="perpustakaan-header">
              <li><Link to="/materi" className="pl-2"><i className="la la-swatchbook la-lg" />Materi</Link> </li>
              <li><Link to="/perpustakaan/pinjam" className="pl-2"><i className="la la-hand-lizard la-lg" />Daftar Pinjam</Link> </li>
              <li className="treeview">
                <Link to='#' className="pl-2"> <i className="la la-cog la-lg" /> <span>Pengaturan</span> <i className="la la-angle-right pull-right" /> </Link>
                <ul className="treeview-menu">
                  <li><Link to="/perpustakaan/kategori"><i className="la la-folder-open la-lg" />Kategori</Link> </li>
                  <li><Link to="/perpustakaan/koleksi"><i className="la la-archway la-lg" />Koleksi</Link> </li>
                </ul>
              </li>
            </ul>
          </Scrollbars>
        </section>
      </aside>
    );
  }
}
export default side;
