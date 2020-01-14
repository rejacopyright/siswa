import React from 'react'
import con from '../api/connection';

class Profile extends React.Component {
  constructor(){
    super();
    this.state = {
      user: con.user
    }
  }
  componentDidMount() {
    console.log(con.img+'/siswa/'+con.user.avatar);
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-3 text-center">
          <div className="card radius-10 card-hover no-b">
            <div className="card-body p-0">
              <img className={`w-100 radius-10`} src={con.img+'/user/'+(this.state.user.avatar || '../user.png')+'?'+Date.now()} alt="img"/>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <h2 className="bolder"> {this.state.user.nama} </h2>
          <p className="bolder">{this.state.user.nis}</p>
        </div>
      </div>
    );
  }
}

export default Profile;
