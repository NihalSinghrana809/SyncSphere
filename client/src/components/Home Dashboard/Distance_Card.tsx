interface DistanceCardProps {
      distance: number;
      change: number;
}

const DistanceCard = ({ distance, change }: DistanceCardProps) => (
      <div className="card">
            <h3>Distance</h3>
            <h1>{distance} km</h1>
            <p>↗ {change}%</p>
      </div>
);

export default DistanceCard;
