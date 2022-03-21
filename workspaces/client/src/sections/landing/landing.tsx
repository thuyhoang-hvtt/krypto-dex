import { Navbar } from '@/components';
import DigitalCard from './components/card';
import Form from './components/form';
import Mission from './components/mission';
import Connection from './components/connection';
import useHooks from './hooks';

function LandingSection() {
  const { state, handler } = useHooks();

  return (
    <section id="home" className="gradient-bg-welcome min-h-screen">
      <Navbar />
      <div className="flex w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
          <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
            <Connection
              walletAddress={state.walletAddress}
              handleConnectWallet={handler.handleConnectWallet}
            />
            <Mission />
          </div>

          <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
            <DigitalCard tokenName={state.tokenName} walletAddress={state.walletAddress} />
            <Form
              isConnected={state.connected}
              isLoading={state.loading}
              data={state.form}
              onInputChange={handler.handleInputChange}
              onSubmit={handler.handleTransferToken}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingSection;
