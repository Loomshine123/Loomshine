import { useState } from 'react';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import { fabricsData } from '../data/fabrics';
import './FabricCareSection.css';

export const FabricCareSection = () => {
  const [activeTab, setActiveTab] = useState(fabricsData[0].id);

  return (
    <section className="section loom-fabric-section" id="fabrics">
      <Container>
        <SectionHeading
          eyebrow="GARMENT EXPERTISE"
          title="Every fabric deserves the right care."
        />

        <div className="loom-fabric-content">
          <div className="loom-fabric-tabs" role="tablist" aria-label="Fabric care options">
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

          <p className="loom-fabric-copy">
            Washed at controlled temperatures to protect colour and keep the weave soft,
            then pressed for a clean, structured finish.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default FabricCareSection;
