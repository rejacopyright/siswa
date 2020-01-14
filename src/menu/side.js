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
    this.sidebarHeight = window.innerHeight - 50;
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
      <aside className="main-sidebar fixed offcanvas shadow-md">
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
          <div className="user-panel px-3 py-0">
            <div className="d-flex align-items-center py-2 row pointer">
              <div className="col-auto pr-1">
                <img className={"user_avatar_xs border-primary "+(this.state.user.avatar ? '' : 'p-2')} src={con.img+'/user/thumb/'+(this.state.user.avatar || '../../user.png')+'?'+Date.now()} alt="img"/>
              </div>
              <div className="col px-1">
                <p className="text-white mt-0 mb-1 bolder text-nowrap text-capitalize">{this.state.user.nama}</p>
                <p className="text-white bolder f-8 m-0">{this.state.user.nis}</p>
              </div>
            </div>
            <div className="clearfix" />
          </div>
          <Scrollbars style={{ height: this.state.height+'px' }} autoHide>
            {/* KURIKULUM */}
            <div className="sidebar-title f-8 bold text-white py-2 pl-3 position-relative pointer" data-toggle="collapse" href="#kurikulum-header" aria-expanded="false"><i className="la la-swatchbook la-lg pr-2" />KURIKULUM <i className="la la-angle-right right right-5 toggle-1" /></div>
            <ul className="sidebar-menu collapse" id="kurikulum-header">
              <li><Link to="/kurikulum/silabus"><i className="la la-book  la-lg" />Silabus</Link> </li>
              <li><Link to="/kurikulum/rpp"><i className="la la-book-open  la-lg" />RPP</Link> </li>
              <li><Link to="/kurikulum/materi"><i className="la la-pencil-alt  la-lg" />Materi</Link> </li>
            </ul>
            {/* SISWA */}
            <div className="sidebar-title f-8 bold text-white py-2 pl-3 position-relative pointer" data-toggle="collapse" href="#siswa-header" aria-expanded="false"><i className="la la-user-tie la-lg pr-2" />SISWA <i className="la la-angle-right right right-5 toggle-1" /></div>
            <ul className="sidebar-menu collapse" id="siswa-header">
              <li><Link to="/siswa"><i className="la la-check-circle  la-lg" />Siswa</Link> </li>
              <li><Link to="/siswa/alumni"><i className="la la-history  la-lg" />Alumni</Link> </li>
              <li><Link to="/siswa/daftar"><i className="la la-door-open  la-lg" />Siswa Daftar</Link> </li>
            </ul>
            {/* PERPUSTAKAAN */}
            <div className="sidebar-title f-8 bold text-white py-2 pl-3 position-relative pointer" data-toggle="collapse" href="#perpustakaan-header" aria-expanded="false"><i className="la la-book-open la-lg pr-2" />PERPUSTAKAAN <i className="la la-angle-right right right-5 toggle-1" /></div>
            <ul className="sidebar-menu collapse" id="perpustakaan-header">
              <li className="treeview">
                <Link to='#'> <i className="la la-cog la-lg" /> <span>Pengaturan</span> <i className="la la-angle-right pull-right" /> </Link>
                <ul className="treeview-menu">
                  <li><Link to="/perpustakaan/kategori"><i className="la la-folder-open  la-lg" />Kategori</Link> </li>
                  <li><Link to="/perpustakaan/koleksi"><i className="la la-archway  la-lg" />Koleksi</Link> </li>
                  <li><Link to="/perpustakaan/penerbit"><i className="la la-map-marker  la-lg" />Penerbit</Link> </li>
                  <li><Link to="/perpustakaan/pengaturan"><i className="la la-cog  la-lg" />Peminjaman</Link> </li>
                </ul>
              </li>
              <li><Link to="/perpustakaan"><i className="la la-book  la-lg" />Daftar Buku</Link> </li>
              <li><Link to="/perpustakaan/pinjam"><i className="la la-hand-lizard  la-lg" />Daftar Pinjam</Link> </li>
            </ul>
            {/* PENGATURAN */}
            <div className="sidebar-title f-8 bold text-white py-2 pl-3 position-relative pointer" data-toggle="collapse" href="#pengaturan-header" aria-expanded="false"><i className="la la-cog la-lg pr-2" />PENGATURAN <i className="la la-angle-right right right-5 toggle-1" /></div>
            <ul className="sidebar-menu collapse" id="pengaturan-header">
              <li className="treeview">
                <Link to='#'> <i className="la la-user-friends la-lg" /> <span>SDM</span> <i className="la la-angle-right pull-right" /> </Link>
                <ul className="treeview-menu">
                  <li><Link to='/sdm/jabatan'><i className="la la-briefcase la-lg" />Jabatan</Link> </li>
                  <li><Link to='/sdm/user'><i className="la la-user la-lg" />User</Link> </li>
                </ul>
              </li>
              <li><Link to="/kurikulum/mapel"><i className="la la-book-open  la-lg" />Mata Pelajaran</Link> </li>
              <li><Link to='/sdm/kelas'><i className="la la-warehouse la-lg" />Kelas</Link> </li>
              <li><Link to='/semester'><i className="la la-clock la-lg" />Semester</Link> </li>
            </ul>
          </Scrollbars>
        </section>
      </aside>
    );
  }
}
export default side;
