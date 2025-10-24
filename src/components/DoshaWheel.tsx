interface DoshaWheelProps {
  percentages: {
    vata: number;
    pitta: number;
    kapha: number;
  };
}

export default function DoshaWheel({ percentages }: DoshaWheelProps) {
  const maxRadius = 140;
  const centerX = 160;
  const centerY = 160;

  const vataRadius = (percentages.vata / 100) * maxRadius;
  const pittaRadius = (percentages.pitta / 100) * maxRadius;
  const kaphaRadius = (percentages.kapha / 100) * maxRadius;

  const vataAngle = 90;
  const pittaAngle = 210;
  const kaphaAngle = 330;

  const polarToCartesian = (angle: number, radius: number) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(radian),
      y: centerY + radius * Math.sin(radian)
    };
  };

  const vataPoint = polarToCartesian(vataAngle, vataRadius);
  const pittaPoint = polarToCartesian(pittaAngle, pittaRadius);
  const kaphaPoint = polarToCartesian(kaphaAngle, kaphaRadius);

  const pathData = `M ${vataPoint.x} ${vataPoint.y} L ${pittaPoint.x} ${pittaPoint.y} L ${kaphaPoint.x} ${kaphaPoint.y} Z`;

  return (
    <div className="relative w-80 h-80">
      <svg width="320" height="320" viewBox="0 0 320 320">
        <circle cx={centerX} cy={centerY} r="5" fill="#9CA3AF" />

        <circle cx={centerX} cy={centerY} r="140" fill="none" stroke="#E5E7EB" strokeWidth="1" />
        <circle cx={centerX} cy={centerY} r="105" fill="none" stroke="#E5E7EB" strokeWidth="1" />
        <circle cx={centerX} cy={centerY} r="70" fill="none" stroke="#E5E7EB" strokeWidth="1" />
        <circle cx={centerX} cy={centerY} r="35" fill="none" stroke="#E5E7EB" strokeWidth="1" />

        <line x1={centerX} y1={centerY} x2={centerX} y2="20" stroke="#E5E7EB" strokeWidth="1" />
        <line x1={centerX} y1={centerY} x2="39" y2="231" stroke="#E5E7EB" strokeWidth="1" />
        <line x1={centerX} y1={centerY} x2="281" y2="231" stroke="#E5E7EB" strokeWidth="1" />

        <path d={pathData} fill="url(#doshaGradient)" fillOpacity="0.4" />
        <path d={pathData} fill="none" stroke="url(#doshaStroke)" strokeWidth="3" />

        <circle cx={vataPoint.x} cy={vataPoint.y} r="8" fill="#3B82F6" />
        <circle cx={pittaPoint.x} cy={pittaPoint.y} r="8" fill="#EF4444" />
        <circle cx={kaphaPoint.x} cy={kaphaPoint.y} r="8" fill="#10B981" />

        <text x={centerX} y="15" textAnchor="middle" className="text-sm font-bold fill-blue-600">
          Vata {percentages.vata}%
        </text>
        <text x="30" y="245" textAnchor="middle" className="text-sm font-bold fill-red-600">
          Pitta {percentages.pitta}%
        </text>
        <text x="290" y="245" textAnchor="middle" className="text-sm font-bold fill-green-600">
          Kapha {percentages.kapha}%
        </text>

        <defs>
          <linearGradient id="doshaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="doshaStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute bottom-0 left-0 right-0 text-center text-sm text-gray-600 mt-4">
        <p>Your Constitutional Balance</p>
      </div>
    </div>
  );
}
