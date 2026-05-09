"use client";

interface SimpleBarChartProps {
  data: Array<{ name: string; value: number; color?: string }>;
  height?: number;
  barWidth?: number;
}

export function SimpleBarChart({ data, height = 200, barWidth = 30 }: SimpleBarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const chartHeight = height - 40; // Leave space for labels
  
  return (
    <div className="w-full" style={{ height }}>
      <svg width="100%" height={height} viewBox={`0 0 ${data.length * 60} ${height}`}>
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(percent => (
          <line
            key={percent}
            x1="0"
            y1={chartHeight - (chartHeight * percent / 100)}
            x2={data.length * 60}
            y2={chartHeight - (chartHeight * percent / 100)}
            stroke="#374151"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
        ))}
        
        {/* Bars */}
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * chartHeight;
          const x = index * 60 + 15;
          const y = chartHeight - barHeight;
          
          return (
            <g key={item.name}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={item.color || "#ef4444"}
                rx="4"
              />
              <text
                x={x + barWidth / 2}
                y={chartHeight + 15}
                textAnchor="middle"
                fill="#9ca3af"
                fontSize="10"
                transform={`rotate(-45, ${x + barWidth / 2}, ${chartHeight + 15})`}
              >
                {item.name}
              </text>
              <text
                x={x + barWidth / 2}
                y={y - 5}
                textAnchor="middle"
                fill="#f3f4f6"
                fontSize="10"
                fontWeight="bold"
              >
                {item.value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

interface SimpleLineChartProps {
  data: Array<{ name: string; value: number; color?: string }>;
  height?: number;
}

export function SimpleLineChart({ data, height = 200 }: SimpleLineChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const chartHeight = height - 40;
  const chartWidth = data.length * 60;
  
  const points = data.map((item, index) => {
    const x = index * 60 + 30;
    const y = chartHeight - (item.value / maxValue) * chartHeight;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <div className="w-full" style={{ height }}>
      <svg width="100%" height={height} viewBox={`0 0 ${chartWidth} ${height}`}>
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(percent => (
          <line
            key={percent}
            x1="0"
            y1={chartHeight - (chartHeight * percent / 100)}
            x2={chartWidth}
            y2={chartHeight - (chartHeight * percent / 100)}
            stroke="#374151"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
        ))}
        
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={data[0]?.color || "#3b82f6"}
          strokeWidth="2"
        />
        
        {/* Points */}
        {data.map((item, index) => {
          const x = index * 60 + 30;
          const y = chartHeight - (item.value / maxValue) * chartHeight;
          
          return (
            <g key={item.name}>
              <circle
                cx={x}
                cy={y}
                r="4"
                fill={item.color || "#3b82f6"}
              />
              <text
                x={x}
                y={chartHeight + 15}
                textAnchor="middle"
                fill="#9ca3af"
                fontSize="10"
                transform={`rotate(-45, ${x}, ${chartHeight + 15})`}
              >
                {item.name}
              </text>
              <text
                x={x}
                y={y - 8}
                textAnchor="middle"
                fill="#f3f4f6"
                fontSize="10"
                fontWeight="bold"
              >
                {item.value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
