export default function EquipmentArt({
  category,
  name,
}: {
  category: string;
  name?: string;
}) {
  const kind = /camera|photo/i.test(category)
    ? "camera"
    : /computer|notebook/i.test(category)
      ? "computer"
      : /sport/i.test(category)
        ? "ball"
        : "projector";
  return (
    <div
      className={`equipment-art ${kind}`}
      role="img"
      aria-label={`${name || category} category illustration`}
    >
      <svg viewBox="0 0 400 280" aria-hidden="true">
        <ellipse cx="200" cy="235" rx="130" ry="14" fill="#CFD8E3" />
        {kind === "camera" ? (
          <>
            <path d="M105 98h42l16-22h67l16 22h45v117H105z" fill="#263B53" />
            <rect
              x="115"
              y="111"
              width="167"
              height="94"
              rx="8"
              fill="#344E69"
            />
            <circle cx="202" cy="158" r="56" fill="#18263A" />
            <circle cx="202" cy="158" r="41" fill="#738399" />
            <circle cx="202" cy="158" r="31" fill="#2446C8" />
            <circle cx="193" cy="147" r="12" fill="#85B7E9" />
            <rect x="119" y="86" width="24" height="12" rx="3" fill="#18263A" />
          </>
        ) : kind === "computer" ? (
          <>
            <path d="M100 68h200v140H100z" fill="#263B53" />
            <path d="M110 78h180v119H110z" fill="#B7D4EA" />
            <path d="M110 197l100-119h80v119z" fill="#2446C8" />
            <path d="M100 208h200l35 22H65z" fill="#738399" />
          </>
        ) : kind === "ball" ? (
          <>
            <circle cx="200" cy="150" r="83" fill="#F2C94C" />
            <path
              d="M117 150h166M200 67v166M142 91q110 60 0 118M258 91q-110 60 0 118"
              fill="none"
              stroke="#263B53"
              strokeWidth="5"
            />
          </>
        ) : (
          <>
            <rect
              x="79"
              y="111"
              width="242"
              height="106"
              rx="20"
              fill="#CFD8E3"
            />
            <path d="M94 105l33-28h156l24 28z" fill="white" />
            <circle cx="259" cy="161" r="40" fill="#263B53" />
            <circle cx="259" cy="161" r="27" fill="#2446C8" />
            <circle cx="250" cy="151" r="9" fill="#85B7E9" />
            {[0, 1, 2, 3, 4].map((i) => (
              <path
                key={i}
                d={`M100 ${139 + i * 10}h82`}
                stroke="#738399"
                strokeWidth="3"
              />
            ))}
          </>
        )}
      </svg>
      <span>Equipment library</span>
    </div>
  );
}
