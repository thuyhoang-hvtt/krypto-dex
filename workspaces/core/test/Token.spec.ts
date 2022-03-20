import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Token } from '@typechain/Token';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Token Contract', () => {
  let contract: Token;
  let master: SignerWithAddress;
  let signers: SignerWithAddress[];

  beforeEach(async () => {
    const Factory = await ethers.getContractFactory('Token');
    [master, ...signers] = await ethers.getSigners();
    contract = await Factory.deploy();
  });

  describe('Deployment', () => {
    it('should set the right master', async () => {
      expect(await contract.master()).to.equal(master.address);
    });

    it('should assign the total supply of tokens to the master', async () => {
      const masterBalance = await contract.balanceOf(master.address);
      expect(await contract.totalSupply()).to.equal(masterBalance);
    });
  });

  describe('Transfer', () => {
    it('should transfer tokens between account properly', async () => {
      const [receiverI, receiverII] = signers;
      await contract.transfer(receiverI.address, 100, 'Yo! Nice to meet you!', 'Greeting');
      const receiverIBalance = await contract.balanceOf(receiverI.address);
      expect(receiverIBalance).to.equal(100);

      await contract.connect(receiverI).transfer(receiverII.address, 50, 'Yo! Welcome!', 'Bye');
      const balanceOfReceiveII = await contract.balanceOf(receiverII.address);
      expect(balanceOfReceiveII).to.equal(50);
    });

    it('should fail if sender does not have enough tokens', async () => {
      const [sampleSigner] = signers;
      const initialMasterBalance = await contract.balanceOf(master.address);

      await expect(
        contract.connect(sampleSigner).transfer(master.address, 1, 'Yo!!!', 'Yaholo')
      ).to.be.revertedWith('Not enough tokens');

      expect(await contract.balanceOf(master.address)).to.equal(initialMasterBalance);
    });

    it('should update appropriate balance of senders/receivers', async () => {
      const [receiverI, receiverII] = signers;
      const initialBalanceOfMaster = await contract.balanceOf(master.address);

      await contract.transfer(receiverI.address, 1000, 'Give away', '');
      await contract.transfer(receiverII.address, 2000, 'Give away', '');

      expect(await contract.balanceOf(master.address)).to.equal(initialBalanceOfMaster.sub(3000));
      expect(await contract.balanceOf(receiverI.address)).to.equal(1000);
      expect(await contract.balanceOf(receiverII.address)).to.equal(2000);
    });
  });

  describe('Transaction', () => {
    it('should increment numberOfTransactions field once calling transfer', async () => {
      const [receiverI, receiverII] = signers;

      expect(await contract.numberOfTransactions()).to.equal(0);

      await contract.transfer(receiverI.address, 1000, 'Give away', '');
      await contract.transfer(receiverII.address, 2000, 'Give away', '');
      expect(await contract.numberOfTransactions()).to.equal(2);
    });

    it('should return all transactions once calling getTransactions', async () => {
      const [receiverI, receiverII] = signers;

      expect(await contract.getTransactions()).to.deep.equal([]);

      await contract.transfer(receiverI.address, 1000, 'Give away', '');
      await contract.transfer(receiverII.address, 2000, 'Give away', '');

      const allTransactions = await contract.getTransactions();
      expect(allTransactions).to.have.lengthOf(2);
    });
  });
});
