import React from 'react'
import Password from '../misc/password';
import axios from 'axios';
import con from '../api/connection';
import Skeleton from 'react-skeleton-loader';
import moment from 'moment';
import 'moment/locale/id';
import Autocomplete from '../misc/autocomplete';

class Setting extends React.Component {
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
  render () {
    if (this.state.loading) {
      return(
        <div className="row">
          <div className="col-md-8 mb-2">
            <Skeleton width="100%" height="50px" borderRadius="10px" widthRandomness={0} />
            <Skeleton width="100%" height="20px" borderRadius="10px" widthRandomness={0.5} count={3} />
            <Skeleton width="100%" height="50px" borderRadius="10px" widthRandomness={0} />
            <Skeleton width="100%" height="20px" borderRadius="10px" widthRandomness={0.5} count={3} />
          </div>
          <div className="col-md-4 mb-2">
            <Skeleton width="100%" height="50px" borderRadius="10px" widthRandomness={0} />
            <Skeleton width="100%" height="20px" borderRadius="10px" widthRandomness={0.5} count={3} />
            <Skeleton width="100%" height="50px" borderRadius="10px" widthRandomness={0} />
            <Skeleton width="100%" height="20px" borderRadius="10px" widthRandomness={0.5} count={3} />
          </div>
        </div>
      )
    }
    return (
      <div className="row">
        <div className="col-md-8 mb-2">
          <div className="card radius-10 position-relative ov">
            <div className="p-3 bg-light border-bottom f-10 text-dark bolder text-left"><i className="la la-user la-lg mx-2" />Informasi Pribadi</div>
            <div className="card-body p-2">
              <div className="d-flex mb-2">
                <div className="col">
                  <p className="m-0 f-9 bolder text-muted">Nama</p>
                  <p className="bolder text-dark text-capitalize">{this.state.user.nama}</p>
                </div>
                <div className="col">
                  <p className="m-0 f-9 bolder text-muted">Jenis Kelamin</p>
                  <p className="bolder text-dark text-capitalize">{(this.state.user.gender === 1 ? 'Laki-laki' : 'Perempuan')}</p>
                </div>
                <div className="col">
                  <p className="m-0 f-9 bolder text-muted">Usia</p>
                  <p className="bolder text-dark">{moment().diff(this.state.user.lahir, 'years')} Tahun</p>
                </div>
              </div>
              <div className="d-flex">
                <div className="col">
                  <p className="m-0 f-9 bolder text-muted">NIS</p>
                  <p className="bolder text-dark text-capitalize">{this.state.user.nis}</p>
                </div>
                <div className="col">
                  <p className="m-0 f-9 bolder text-muted">Nomor KK</p>
                  <p className="bolder text-dark">{this.state.user.kk}</p>
                </div>
                <div className="col">
                  <p className="m-0 f-9 bolder text-muted">Tgl Lahir</p>
                  <p className="bolder text-dark">{moment(this.state.user.lahir).format('Do MMMM YYYY')}</p>
                </div>
              </div>
              <Autocomplete name="alamat" value={this.state.user.alamat} divClass="col mb-2" title="Alamat" api="lokasi" placeholder="Cari alamat" error="*Alamat harus di isi" />
                <div className="d-flex">
                  <div className="col">
                    <p className="m-0 f-9 bolder text-muted">Catatan Siswa</p>
                    <p className="bolder f-9 text-dark mt-1" dangerouslySetInnerHTML={{ __html: this.state.user.catatan }} />
                  </div>
                </div>
              <div className="d-flex align-items-center py-3">
                <div className="col px-0"><hr className="m-0" /></div>
                <div className="col-auto"><span className="alert alert-info py-1 bolder">Informasi Wali</span></div>
                <div className="col px-0"><hr className="m-0" /></div>
              </div>
              <div className="d-flex">
                <div className="col">
                  <p className="m-0 f-9 bolder text-muted">Nama Wali</p>
                  <p className="bolder text-dark text-capitalize">{this.state.user.wali_nama}</p>
                </div>
                <div className="col">
                  <p className="m-0 f-9 bolder text-muted">Hubungan</p>
                  <p className="bolder text-dark">{this.state.user.wali_status}</p>
                </div>
                <div className="col">
                  <p className="m-0 f-9 bolder text-muted">Kontak Wali</p>
                  <p className="bolder text-dark">{this.state.user.wali_tlp}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-2">
          <div className="card oh radius-10">
            <div className="p-3 bg-light border-bottom f-10 text-dark bolder text-center"><i className="la la-lock la-lg mr-2" />Ubah Password</div>
            <div className="card-body p-2">
              <Password name="old_password" length="4" capital={false} number={false} divClass="col mb-2" title="Password lama" placeholder="Password lama" />
              <Password name="password" length="4" capital={false} number={false} divClass="col mb-2" title="Password Baru" placeholder="Password Baru" />
              <Password name="confirm_password" length="4" capital={false} number={false} divClass="col mb-2" title="Konfirmasi Password" placeholder="Konfirmasi Password" />
            </div>
            <div className="text-right text-info pb-2">
              <hr className="my-1"/>
              <span className="btn btn-white btn-xs bolder">Simpan Perubahan</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Setting;
