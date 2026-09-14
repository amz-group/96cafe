type LogoStyle = 'flag' | 'cup';

function LogoBadge({ style }: { style: LogoStyle }) {
  if (style === 'flag') {
    return (
      <div className="logo-flag" aria-hidden="true">
        <div className="logo-flag-pole" />
        <div className="logo-flag-cloth">
          <span className="logo-flag-text">96</span>
        </div>
      </div>
    );
  }

  return (
    <div className="logo-cup-stamp" aria-hidden="true">
      <span className="logo-cup-text">96</span>
    </div>
  );
}

export default LogoBadge;
