import React from "react";
import "../Dasboard.css";

const Prescriptions = ({ all }) => {
  console.log(all);

  return (
    <div className="background1">
      <section className="mt-5 mr-2 ml-2">
        <div className="table-responsive">
          <table class="table bg-light">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Medicine</th>
                <th scope="col">Description</th>
                <th scope="col">Units</th>
                <th scope="col">Timing</th>
              </tr>
            </thead>
            <tbody>
              {all.map((el) => (
                <tr key={el.id}>
                  <td>{el.Medicine}</td>
                  <td>{el.Description}</td>
                  <td>{el.Amount}</td>
                  <td>{el.Timing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Prescriptions;
