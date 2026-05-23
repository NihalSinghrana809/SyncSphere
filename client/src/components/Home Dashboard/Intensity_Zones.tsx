interface Zone {
      label: string;
      value: number;
      color: string;
}

interface IntensityZonesProps {
      zones: Zone[];
}

const IntensityZones = ({ zones }: IntensityZonesProps) => (
      <div className="card">
            <h3>Intensity Zones</h3>
            {zones.map((zone, i) => (
                  <div key={i} className="zone">
                        <span>{zone.label}</span>
                        <div className="bar">
                              <svg className="fill" viewBox="0 0 100 8" preserveAspectRatio="none">
                                    <rect x="0" y="0" width={zone.value} height="8" rx="999" fill={zone.color} />
                              </svg>
                        </div>
                        <span>{zone.value}%</span>
                  </div>
            ))}
            <p className="note">Anaerobic Threshold reached in 34% of session.</p>
      </div>
);

export default IntensityZones;
