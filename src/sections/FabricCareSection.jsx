import { useState } from 'react';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import { fabricsData } from '../data/fabrics';
import './FabricCareSection.css';

export const FabricCareSection = () => {
  const [activeTab, setActiveTab] = useState(fabricsData[0].id);

  const selectedFabric = fabricsData.find((f) => f.id === activeTab) || fabricsData[0];

  return (
    <section className="section loom-fabric-section" id="fabrics">
      <Container>
        <SectionHeading
          eyebrow="GARMENT EXPERTISE"
          title="Every fabric deserves the right care."
          subtitle="Washed at controlled temperatures to protect colour and keep the weave soft, then pressed for a clean, structured finish."
        />

        {/* Pill-Tabs */}
        <div className="loom-fabric-tabs" role="tablist">
          {fabricsData.map((fabric) => (
            <button
              key={fabric.id}
              role="tab"
              aria-selected={activeTab === fabric.id}
              className={`loom-fabric-tab ${activeTab === fabric.id ? 'loom-fabric-tab--active' : ''}`}
              onClick={() => setActiveTab(fabric.id)}
            >
              {fabric.name}
            </button>
          ))}
        </div>

        {/* Active Fabric Detail Display */}
        <div className="loom-fabric-detail-card">
          <div>
            <span className="loom-fabric-detail__tagline">{selectedFabric.tagline}</span>
            <h3 className="loom-fabric-detail__title">{selectedFabric.name}</h3>
            <p className="loom-fabric-detail__desc">{selectedFabric.description}</p>
            <div className="loom-fabric-detail__box">
              <span style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', color: '#071A33', marginBottom: '4px' }}>
                Loomshine Care Standard:
              </span>
              <span style={{ fontSize: '14px', color: '#4A5D73' }}>
                {selectedFabric.careTips}
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '24px', background: '#F8F7F3', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '8px' }}>🧶</span>
            <span style={{ fontFamily: 'Cormorant Garamond', fontSize: '20px', fontWeight: 'bold', color: '#071A33' }}>
              Custom {selectedFabric.name} Treatment
            </span>
            <p style={{ fontSize: '13px', color: '#7A8C9E', marginTop: '4px' }}>
              100% Fibre Protection & Color Lock
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FabricCareSection;
