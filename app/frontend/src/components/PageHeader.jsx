function PageHeader({ eyebrow, title, description, badge }) {
  return (
    <div className="page-header">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
        {description ? <p className="auth-text">{description}</p> : null}
      </div>
      {badge ? <div className="menu-badge">{badge}</div> : null}
    </div>
  );
}

export default PageHeader;
