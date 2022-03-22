import { SmartContractContextProvider } from './context/smart-contract.context';
import { LandingSection } from './sections';

const App = () => (
  <SmartContractContextProvider>
    <div className="min-h-screen">
      <LandingSection />
    </div>
  </SmartContractContextProvider>
);

export default App;
