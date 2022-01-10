import { getBezierPath, getMarkerEnd } from "react-flow-renderer";
import "./style.css";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  arrowHeadType,
  markerEndId,
}: any) {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <text className="react-flow__text">
        <textPath
          href={`#${id}`}
          style={{ fontSize: "12px", stroke: "black" }}
          startOffset="50%"
          textAnchor="middle"
        >
          {data.text}
        </textPath>
      </text>
    </>
  );
}