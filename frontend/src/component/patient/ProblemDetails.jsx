import React from "react";
import Card from "../Card";
import PatientsNavbar from "./PatientsNavbar";

const ProblemDetails = ({ allergy, problem }) => {

    const funType =(type) =>{
        if (type==='1'){
            return 'Active';
        }else{
            return "Intolerance";
        }
    };

    const funCrit =(Crit) =>{
        if (Crit==='1'){
            return 'Low';
        }else if(Crit==='2'){
            return "Medium";
        }else{
            return "High";
        }
    };

    const funVeri =(Veri) =>{
        if (Veri==='1'){
            return 'Suspected';
        }else if(Veri==='2'){
            return "Likely";
        }else if(Veri==='3'){
            return "Confirmed";
        }else if(Veri==='4'){
            return "Resolved";
        }else{
            return "Refuted";
        }
    };

    const funStat =(Stat) =>{
        if (Stat==='1'){
            return 'Active';
        }else{
            return "Resolved";
        }
    };

    const funSever =(Sever) =>{
        if (Sever==='1'){
            return 'Mild';
        }else if(Sever==='2'){
            return "Moderate";
        }else{
            return "Severe";
        }
    };


  return (
    <div>
      <section class="cardBox background1 mt-5">
        <div class="row card-container">
          {allergy &&
            allergy.map((el) => {
              let data = {
                Type: funType(el.type),
                Substance: el.substance,
                Criticality: funCrit(el.criticality),
                "Verification Status":funVeri(el.verification_status),
              };

              return (
                <div class="col-md-6 card-container-container ">
                  <div class="card text-center w-75">
                    <Card title="Allergy" data={data} />
                  </div>
                </div>
              );
            })}
        </div>

        <div class="row card-container">
          {problem &&
            problem.map((ele) => {
              let prob = {
                Description: ele.problem_name,
                Severity: funSever(ele.severity),
                Status: funStat(ele.status),
              };
              return (
                <div class="col-md-6 card-container-container ">
                  <div class="card text-center w-75">
                    <Card title="Problem" data={prob} />
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
};

export default ProblemDetails;
