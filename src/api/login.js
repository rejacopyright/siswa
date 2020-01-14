import React from 'react';
import Skeleton from 'react-skeleton-loader';
import con from '../api/connection';
import axios from 'axios';

class Login extends React.Component {
  state = {
    loading:false,
    error:false,
    message:''
  }
  componentDidMount() {
    document.title = 'Login';
  }
  Login = () => {
    if (this.nis.value) {
      this.setState({ loading:true });
    }else {
      this.setState({
        message:'*Mohon isi nis dan password'
      });
    }
    const q = {nis:this.nis.value, password:this.password.value};
    axios.post(con.api + '/siswa/login',q)
    .then(res => {
      if (res.data) {
        localStorage.setItem('auth', true);
        localStorage.setItem('user', JSON.stringify(res.data));
        this.props.onLogin({ auth: localStorage.getItem('auth') });
      }else if (this.nis.value) {
        this.setState({
          loading:false,
          error:true,
          message:'*NIS atau Password salah'
        });
      }
    });
  }
  render() {
    const Loading = () => {
      if (this.state.loading) {
        return (
          <div className="position-absolute text-center l-0 w-100 z-9 bg-light">
            <div className="form-group mb-2">
              <Skeleton width="60%" height="30px" widthRandomness={0} />
              <Skeleton width="60%" height="30px" widthRandomness={0} />
            </div>
          </div>
        )
      }else {
        return '';
      }
    }
    return (
      <div className="row m-0">
        <div className="col-md-7 vh-100 d-none d-md-flex align-items-center bg-white p-0 justify-content-center">
          <img src={con.img+'/bg/1.svg'} className="h-75" alt="img" />
        </div>
        <div className="col-md-5 col-12 vh-100 d-flex align-items-center p-0 bg-light justify-content-center">
          <div>
            <div className="text-center">
              <img src={con.img+'/logo.png'} className="hpx-100 radius-50 border border-2 border-primary border-dash p-2" alt="img" />
              <div className="my-1 d-flex align-items-center justify-content-center">
                <span className="f-16 text-primary mr-1">SISKA</span>
                <span className="f-10"> | Login Siswa</span>
              </div>
              <p className="mt-0 lh-1"> Sistem Informasi Sekolah </p>
            </div>
            <form>
              <Loading />
              <div className="form-group reja-input-icon mb-2">
                <i className="la la-user la-lg" />
                <input type="text" ref={(i) => this.nis = i} onChange={() => this.nis.value = this.nis.value.toUpperCase()} name="nis" className="form-control form-control-sm bg-white radius-5" placeholder="NIS" required autoFocus autoComplete="off" />
              </div>
              <div className="form-group reja-input-icon mb-0">
                <i className="la la-lock la-lg" />
                <input type="password" ref={(i) => this.password = i} name="password" className="form-control form-control-sm bg-white radius-5" placeholder="Kata Sandi" required autoComplete="off" />
              </div>
              <p className="text-danger f-9 bold text-center my-2">{this.state.message}</p>
              <button type="button" className="btn btn-block btn-sm btn-primary shadow-none radius-5" onClick={this.Login}>Login</button>
              <p className="text-center mt-2 lh-1">
                <span className="quest"> Belum memiliki akun ? </span>
                <a href="##" className="change change-btn">Registrasi</a>
              </p>
              <p className="text-center">atau</p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login
