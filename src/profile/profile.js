import React from 'react'
import {Route, Link} from 'react-router-dom'
import axios from 'axios';
import con from '../api/connection';
import Skeleton from 'react-skeleton-loader';
import moment from 'moment';
import 'moment/locale/id';
import Slider from "react-slick";
import "../assets/css/slick/slick.scss";
import ProfileSetting from './setting';

class Profile extends React.Component {
  constructor(){
    super();
    this._isMounted = false;
    this.state = {
      user: {kelas:{}},
      loading:true
    }
  }
  componentDidMount() {
    this._isMounted = true;
    document.title = 'Kelas';
    this._isMounted && axios.get(con.api+'/profile/'+con.user.siswa_id, {headers:con.headers})
    .then(res => {
      this.setState({ user:res.data, loading:false });
    });
  }
  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {breakpoint:900,settings:{slidesToShow:2}},
        {breakpoint:480,settings:{slidesToShow:1}}
      ]
    };
    if (this.state.loading) {
      return(
        <div className="row">
          <div className="col-md-3 text-center mb-2">
            <Skeleton width="100px" height="100px" borderRadius="100px" widthRandomness={0} />
            <div>
              <Skeleton width="100%" height="20px" borderRadius="10px" widthRandomness={0.5} count={3} />
              <hr className=""/>
              <Skeleton width="100%" height="50px" borderRadius="10px" widthRandomness={0} />
              <Skeleton width="100%" height="20px" borderRadius="10px" widthRandomness={0.5} count={3} />
            </div>
          </div>
          <div className="col-md-9 mb-2">
            <div className="row">
              <div className="col mb-3">
                <div className="row">
                  <div className="col-auto">
                    <Skeleton width="50px" height="50px" borderRadius="50px" widthRandomness={0} />
                  </div>
                  <div className="col px-0">
                    <Skeleton width="100%" height="15px" borderRadius="10px" widthRandomness={0.25} count={2} />
                  </div>
                </div>
              </div>
              <div className="col mb-3">
                <div className="row">
                  <div className="col-auto">
                    <Skeleton width="50px" height="50px" borderRadius="50px" widthRandomness={0} />
                  </div>
                  <div className="col px-0">
                    <Skeleton width="100%" height="15px" borderRadius="10px" widthRandomness={0.5} count={2} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="row">
        <div className="col-md-3 col-lg-2 text-center">
          <div className="card radius-0 bg-light no-b">
            <div className="card-body">
              <div className="d-block position-absolute t-0 r-0 pr-2 pt-1">
                <i className="la la-times" />
              </div>
              <img className={`w-100 radius-150`} src={con.img+'/user/'+(this.state.user.avatar || '../user.png')+'?'+Date.now()} alt="img"/>
              <div className="badge border border-info d-block mt-3 text-info bolder pointer py-2"><i className="la la-camera la-lg mr-1" />Ganti</div>
            </div>
          </div>
          <div className="text-center bolder mt-2">
            {this.state.user.nama}
            <hr className="my-3"/>
            <p className="badge badge-info-light border border-info strong f-8 py-1 radius-20">{this.state.user.nis}</p>
          </div>
          <div className="card no-b">
            <div className="card-body p-0">
              <div className="d-flex border-bottom">
                <div className="col p-0 text-left f-8 bolder my-1">Aktif</div>
                <div className="col p-0 text-right f-8 bolder my-1 text-info"><i className="la la-check la-lg" /></div>
              </div>
              <div className="d-flex border-bottom">
                <div className="col p-0 text-left f-8 bolder my-1">Kelas</div>
                <div className="col p-0 text-right f-8 bolder my-1 text-info">{this.state.user.kelas.nama}</div>
              </div>
              <div className="d-flex">
                <div className="col p-0 text-left f-8 bolder my-1">Usia</div>
                <div className="col p-0 text-right f-8 bolder my-1 text-info">{moment().diff(this.state.user.lahir, 'years')} Tahun</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9 col-lg-10">
          <Slider {...settings}>
            <Link to="/profile/materi" className="card no-b card-hover mb-2 text-dark no-drag">
              <div className="card-body p-2 d-flex align-items-center">
                <div className="square-40 radius-50 bg-light f-18 text-center text-dark mr-2"> <i className="la la-book-open pt-2" /> </div>
                <div><p className="m-0 bolder">Materi</p><p className="m-0 f-9">Diselsaikan</p></div>
                <div className="ml-auto"><span className="alert alert-info py-1 radius-30 strong">10</span></div>
              </div>
            </Link>
            <Link to="/profile/setting" className="card no-b card-hover mb-2 text-dark no-drag">
              <div className="card-body p-2 d-flex align-items-center">
                <div className="square-40 radius-50 bg-light f-18 text-center text-dark mr-2"> <i className="la la-user pt-2" /> </div>
                <div><p className="m-0 bolder">Informasi</p><p className="m-0 f-9">Akun</p></div>
              </div>
            </Link>
            <Link to="#" className="card no-b card-hover mb-2 text-dark no-drag">
              <div className="card-body p-2 d-flex align-items-center">
                <div className="square-40 radius-50 bg-light f-18 text-center text-dark mr-2"> <i className="la la-list-alt pt-2" /> </div>
                <div><p className="m-0 bolder">Riwayat</p><p className="m-0 f-9">Hasil Tes</p></div>
                <div className="ml-auto"><span className="alert alert-info py-1 radius-30 strong">22</span></div>
              </div>
            </Link>
            <Link to="#" className="card no-b card-hover mb-2 text-dark no-drag">
              <div className="card-body p-2 d-flex align-items-center">
                <div className="square-40 radius-50 bg-light f-18 text-center text-dark mr-2"> <i className="la la-wallet pt-2" /> </div>
                <div><p className="m-0 bolder">Tagihan</p><p className="m-0 f-9">Keuangan</p></div>
                <div className="ml-auto"><span className="alert alert-info py-1 radius-30 strong">22</span></div>
              </div>
            </Link>
            <Link to="#" className="card no-b card-hover mb-2 text-dark no-drag">
              <div className="card-body p-2 d-flex align-items-center">
                <div className="square-40 radius-50 bg-light f-18 text-center text-dark mr-2"> <i className="la la-book pt-2" /> </div>
                <div><p className="m-0 bolder">Pinjaman</p><p className="m-0 f-9">Buku</p></div>
                <div className="ml-auto"><span className="alert alert-info py-1 radius-30 strong">22</span></div>
              </div>
            </Link>
          </Slider>
          <div className="row">
            <div className="col mt-2">
              <Route exact path="/profile/setting" component={ProfileSetting} />
              <Route exact path="/profile/materi"> Materi </Route>
              <Route exact path="/profile"> Materi </Route>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
