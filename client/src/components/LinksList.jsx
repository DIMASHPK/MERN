import React from "react";
import { NavLink } from "react-router-dom";

export const LinksList = ({ links }) => (
  <>
    {!links.length ? (
      <p className="center">Ссылок нету</p>
    ) : (
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Original</th>
            <th>shorted</th>
            <th>Open</th>
          </tr>
        </thead>

        <tbody>
          {links.map(({ _id, from, to }, i) => (
            <tr key={_id}>
              <td>{i + 1}</td>
              <td>{from}</td>
              <td>{to}</td>
              <td>
                <NavLink to={"detail/" + _id}>Open</NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </>
);
