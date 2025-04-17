import { ethers } from "ethers-old";

class MorphoIntegration {
  // constructor(rpcEndpoint, contractAddress, contractABI, privateKey = null) {
  //   this.provider = new ethers.JsonRpcProvider(rpcEndpoint);
  //   this.contractAddress = contractAddress;

  //   if (privateKey) {
  //     const wallet = new ethers.Wallet(privateKey, this.provider);
  //     this.contract = new ethers.Contract(contractAddress, contractABI, wallet);
  //   } else {
  //     this.contract = new ethers.Contract(
  //       contractAddress,
  //       contractABI,
  //       this.provider
  //     );
  //   }
  // }

  constructor(provider, contractAddress, contractABI) {
    this.provider = provider;
    const signer = provider.getSigner();
    this.contract = new ethers.Contract(contractAddress, contractABI, signer);
  }

  async supplyCollateral(marketParams, assets, onBehalf) {
    try {
      const tx = await this.contract.supplyCollateral(
        marketParams,
        assets,
        onBehalf,
        "0x" // Empty bytes data
      );
      await this.sleep(6000);
      return tx;
    } catch (error) {
      console.error("Collateral Supply Failed:", error);
      throw error;
    }
  }
  async supply(marketParams, assets, onBehalf) {
    try {
      const tx = await this.contract.supply(
        marketParams,
        assets,
        0, // shares set to 0
        onBehalf,
        "0x" // Empty bytes data
      );
      await this.sleep(6000);
      return tx;
    } catch (error) {
      console.error("USBD Supply Failed:", error);
      throw error;
    }
  }

  async borrow(marketParams, assets, onBehalf, receiver) {
    try {
      const tx = await this.contract.borrow(
        marketParams,
        assets,
        0, // shares set to 0
        onBehalf,
        receiver
      );
      await this.sleep(6000);
      return tx;
    } catch (error) {
      console.error("Borrow Failed:", error);
      throw error;
    }
  }

  async repay(marketParams, assets, onBehalf) {
    try {
      const tx = await this.contract.repay(
        marketParams,
        assets,
        0, // shares set to 0
        onBehalf,
        "0x" // Empty bytes data
      );
      await tx.wait();
      return tx;
    } catch (error) {
      console.error("Repay Failed:", error);
      throw error;
    }
  }
  async generateMarketId(marketParams) {
    const encoded = ethers.utils.defaultAbiCoder.encode(
      ["address", "address", "address", "address", "uint256"],
      [
        marketParams.loanToken,
        marketParams.collateralToken,
        marketParams.oracle,
        marketParams.irm,
        marketParams.lltv,
      ]
    );
    return await ethers.utils.keccak256(encoded);
  }
  async positionsMetadata(marketId, userAddress) {
    try {
      const position = await this.contract.position(marketId, userAddress);
      const market = await this.contract.market(marketId);
      // Convert BigNumber values to strings or numbers
      const collateral = parseFloat(
        ethers.utils.formatUnits(position.collateral, 18)
      ); // Assuming 18 decimals
      const borrowShares = parseFloat(
        ethers.utils.formatUnits(position.borrowShares, 18)
      ); // Assuming 18 decimals
      const totalBorrowShares = parseFloat(
        ethers.utils.formatUnits(market.totalBorrowShares, 18)
      ); // Assuming 18 decimals
      const totalBorrowAssets = parseFloat(
        ethers.utils.formatUnits(market.totalBorrowAssets, 18)
      ); // Assuming 18 decimals

      // Calculate LTV (Loan-to-Value)
      const ltv = (borrowShares / totalBorrowShares) * 100;

      // Convert borrowShares to borrowed amount
      const borrowedAmount =
        (borrowShares * totalBorrowAssets) / totalBorrowShares;

      // Calculate Health Index
      const healthIndex = (collateral / borrowedAmount) * 100;
      return {
        ltv: `${ltv.toFixed(3)}%`,
        healthIndex: healthIndex.toFixed(4),
      };
    } catch (error) {
      console.error(
        "Error fetching position metadata morpho integration:",
        error
      );
      throw error;
    }
  }
  async getUserLendsAndBorrows(marketId, userAddress) {
    try {
      // Fetch the user's position
      const pos = await this.contract.position(marketId, userAddress);

      // Fetch market data
      const marketData = await this.contract.market(marketId);

      const totalSupplyAssets = marketData.totalSupplyAssets;
      const totalSupplyShares = marketData.totalSupplyShares;
      const totalBorrowAssets = marketData.totalBorrowAssets;
      const totalBorrowShares = marketData.totalBorrowShares;

      // Calculate user's supply and borrow assets
      const userSupplyAssets = totalSupplyShares.isZero()
        ? ethers.constants.Zero
        : pos.supplyShares.mul(totalSupplyAssets).div(totalSupplyShares);

      const userBorrowAssets = totalBorrowShares.isZero()
        ? ethers.constants.Zero
        : pos.borrowShares.mul(totalBorrowAssets).div(totalBorrowShares);

      const userCollateral = pos.collateral;

      return {
        totalLends: ethers.utils.formatUnits(userSupplyAssets, 18),
        totalBorrows: ethers.utils.formatUnits(userBorrowAssets, 18),
        totalCollateral: ethers.utils.formatUnits(userCollateral, 18),
      };
    } catch (error) {
      // Handle the case where the user has no position or other errors
      if (error.code === "CALL_EXCEPTION") {
        console.warn("User has no position or position data is unavailable.");
        return {
          totalLends: "0",
          totalBorrows: "0",
          totalCollateral: "0",
        };
      } else {
        // Log other errors and return default values
        console.error("Error fetching user position:", error);
        return {
          totalLends: "0",
          totalBorrows: "0",
          totalCollateral: "0",
        };
      }
    }
  }
  async getTotalStats(marketId) {
    try {
      // Fetch market data
      const marketData = await this.contract.market(marketId);

      const totalSupplyAssets = marketData.totalSupplyAssets;
      const totalBorrowAssets = marketData.totalBorrowAssets;

      // Format the values
      const formattedTotalSupply = ethers.utils.formatUnits(
        totalSupplyAssets,
        18
      );
      const formattedTotalBorrow = ethers.utils.formatUnits(
        totalBorrowAssets,
        18
      );

      console.log("Market Data", marketData);
      return {
        totalSupply: formattedTotalSupply,
        totalBorrow: formattedTotalBorrow,
      };
    } catch (error) {
      // Handle the case where the market data is unavailable or the call fails
      if (error.code === "CALL_EXCEPTION") {
        console.warn("Market data unavailable or call failed.");
        return {
          totalSupply: "0",
          totalBorrow: "0",
        };
      } else {
        // Log other errors and return default values
        console.error("Error fetching total stats:", error);
        return {
          totalSupply: "0",
          totalBorrow: "0",
        };
      }
    }
  }
  async withdrawCollateral(marketParams, assets, onBehalf, receiver) {
    try {
      const tx = await this.contract.withdrawCollateral(
        marketParams,
        assets,
        onBehalf,
        receiver
      );
      return tx;
    } catch (error) {
      console.error("Collateral Withdrawal Failed:", error);
      throw error;
    }
  }
  async totalCollateralBalance(collateralTokenAddress) {
    try {
      // Create an instance of the ERC-20 token contract
      const tokenContract = new ethers.Contract(
        collateralTokenAddress,
        [
          "function balanceOf(address owner) view returns (uint256)", // ERC-20 balanceOf function
        ],
        this.provider // Use the provider from the class
      );

      // Fetch the balance of the collateral token held by the smart contract
      const contractAddress = this.contract.address; // Address of the Morpho contract
      const balance = await tokenContract.balanceOf(contractAddress);

      // Convert the balance to a human-readable number (assuming 18 decimals)
      const formattedBalance = ethers.utils.formatUnits(balance, 18);

      return formattedBalance;
    } catch (error) {
      console.error("Error fetching collateral token balance:", error);
      throw error;
    }
  }
  async withdraw(marketParams, assets, onBehalf, receiver) {
    try {
      const tx = await this.contract.withdraw(
        marketParams,
        assets,
        0, // shares set to 0
        onBehalf,
        receiver
      );
      return tx;
    } catch (error) {
      console.error("Withdraw Failed:", error);
      throw error;
    }
  }

  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default MorphoIntegration;
