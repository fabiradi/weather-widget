import { renderTime } from "../utils/time"

const SimpleBarGraph = ({ data }) => (
  <div style={{ whiteSpace: "pre" }}>
    <div style={{ display: "inline-block", marginRight: "0.5em" }}>
      {renderTime(data?.[0].dt)}
    </div>
    {data?.map((item, i: number) => (
      <div
        key={i}
        style={{ display: "inline-block", borderRight: "1px solid #fff" }}
      >
        {/*<div>{(item.dt / 60) % 5 === 0 ? renderTime(item.dt) : ""}</div>*/}
        <div
          style={{
            background: "#30f",
            height: 1 + item.precipitation * 100,
          }}
        ></div>
        <div
          style={{
            textAlign: "center",
            width: "1em",
            fontSize: "50%",
            color: "#ccc",
          }}
          title={renderTime(item.dt)}
        >
          {item.precipitation}
        </div>
      </div>
    ))}
    <div style={{ display: "inline-block", marginLeft: "0.5em" }}>
      {renderTime(data?.[data.length - 1].dt)}
    </div>
  </div>
)

export default SimpleBarGraph
