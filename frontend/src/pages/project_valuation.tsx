import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import ProjectValuationTable from '../components/ProjectValuationTable';
import { number } from 'prop-types';

export function ProjectValuationPage() {
  return (
    <div style={{ flex: 1, padding: 5, height: "60vh" }}>
      <p>
        <div style={{ fontSize: 30, padding: 20, fontWeight: '900', display: "table-cell" }}>
          Project valuation
        </div>
        {/* <div style={{ fontSize: 20, paddingBottom: 10, paddingLeft: 30, display: "table-cell" }}>
          <div style={{ paddingRight: 20 }}>Cost of equity</div>
          <input type='number' style={{ paddingLeft: 30, borderRadius: "8px" }}></input>
        </div>
        <div style={{ fontSize: 20, paddingBottom: 10, paddingLeft: 30, display: "table-cell" }}>
          <div style={{ paddingRight: 20, display: "inline-block" }}>Valuation date</div>
          <input type='date' style={{ paddingLeft: 25, borderRadius: "8px" }}></input>
        </div> */}
        <div style={{ padding: 20 }}>
          <ProjectValuationTable />
        </div>
      </p>
    </div>
  );
}
