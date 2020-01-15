import React from 'react'
import axios from 'axios';
import con from '../api/connection';
import Rating from 'react-rating';
import Checkbox from '../misc/checkbox';
import Random from 'randomstring';
import SelectM from '../misc/select-multiple';
class Materi extends React.Component {
  constructor(props){
    super(props);
    this._isMounted = false;
    this.state = {
      materi:[],
      materi_page:1,
      materi_search:'',
      materi_self:{silabus:{},kelas:{},semester:{},mapel:{}},
      loading:true,
      mapel:[]
    }
  }
  componentDidMount() {
    this._isMounted = true;
    document.title = 'Materi';
    this._isMounted && axios.get(con.api+'/materi/'+con.user.kelas_id, {headers:con.headers, params:{page:this.state.materi_page}})
    .then(res => {
      const mapel = res.data.mapel.map(r => {return {id:r.mapel_id, text:r.nama}});
      this.setState({ materi:res.data.materi, loading:false, mapel:mapel });
    });
  }
  mapelChange(val){
    this._isMounted && this.setState({ loading:true });
    this._isMounted && axios.get(con.api+'/materi/'+con.user.kelas_id, {headers:con.headers, params:{page:this.state.materi_page, mapel_id:val}})
    .then(res => {
      this.setState({ materi:res.data.materi, loading:false });
    });
  }
  render () {
    return(
      <div className="row">
        <div className="col-md-3">
          <div className="sticky t-4 z-9">
            <div className="card no-b shadow-xs">
              <div className="p-3 bg-light border-bottom f-10 text-dark bolder text-left"><i className="la la-user la-lg mx-2" />Filter Berdasarkan</div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md mb-2">
                    <Checkbox name="status" id="status" value="1" title="Aktifkan" className="mr-2" divClass="" />
                  </div>
                </div>
                <div className="row">
                  {
                    this.state.mapel.length &&
                    <SelectM onChange={i => this.mapelChange(i)} selected={this.state.mapel} name="mapel_id" title="Mata Pelajaran" className="col-md" data={this.state.mapel} placeholder="Pilih Mata Pelajaran" />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="row">
            {
              this.state.materi.map((r, index) => (
                <div className="col-md-6 mb-3" key={index}>
                  <div className="card h-100 no-b shadow-xs">
                    <div className="card-body pb-4">
                      <div className="d-flex align-items-center">
                        <div className="mr-2">
                          <img src={con.img+'/user/thumb/'+(r.pengajar && r.pengajar.avatar ? r.pengajar.avatar : '../../user.png')+'?'+Random.generate()} alt="img" className="user_avatar_xs"/>
                        </div>
                        <div className="">
                          <p className="m-0 f-10 bolder text-info">{r.pengajar.nama}</p>
                          <p className="m-0 f-9 bolder badge badge-light py-1">{r.mapel}</p>
                        </div>
                        <div className="ml-auto text-right">
                          <p className="m-0 f-9 bolder badge badge-light py-1 text-capitalize">{r.semester}</p>
                        </div>
                      </div>
                      <table className="mt-3">
                        <tbody>
                          <tr>
                            <td className="lh-1 align-top"><span className="m-0 f-8 bolder badge badge-info-light py-1 mr-2">SK</span></td>
                            <td className="lh-1"><span className="f-8 bolder">{r.sk}</span></td>
                          </tr>
                          <tr>
                            <td className="lh-1 align-top"><span className="m-0 f-8 bolder badge badge-warning-light py-1 mr-2">KD</span></td>
                            <td className="lh-1"><span className="f-8 bolder">{r.kd}</span></td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="mt-3 f-11 lh-15 bolder"> {r.nama} </p>
                      <div className="position-absolute d-flex align-items-center b-0 r-0 mb-2">
                        <p className="mb-0 mr-2 f-8"><Rating emptySymbol="la la-star la-lg" fullSymbol="la la-star la-lg text-warning" fractions={2} readonly initialRating={3.5} /> <span className="ml-2 strong">7/10</span></p>
                        <p className="m-0 f-8 bolder badge badge-success-light py-1 mr-2">Diselesaikans</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Materi;
