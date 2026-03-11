"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Gift, PencilLine, Plus, X } from "lucide-react";
import { useState } from "react";

export default function Shipping() {
  const [freeShippingCities, setFreeShippingCities] = useState(["Processing"]);
  const [sameDayCities, setSameDayCities] = useState(["Groenlo", "Lichtenvoorde", "Aalten", "Bredevoort"]);
  const [prices, setPrices] = useState({ standardPickup: 5.00, standardDelivery: 5.00, deliverySurcharge: 5.00 });

  const [isFreeCityModalOpen, setIsFreeCityModalOpen] = useState(false);
  const [isSameDayCityModalOpen, setIsSameDayCityModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);

  const [newCityInput, setNewCityInput] = useState("");
  const [editPricesInput, setEditPricesInput] = useState({ ...prices });

  const handleAddFreeCity = () => {
    if (newCityInput.trim() && !freeShippingCities.includes(newCityInput.trim())) {
      setFreeShippingCities([...freeShippingCities, newCityInput.trim()]);
    }
    setNewCityInput("");
    setIsFreeCityModalOpen(false);
  };

  const handleRemoveFreeCity = (cityToRemove: string) => {
    setFreeShippingCities(freeShippingCities.filter(city => city !== cityToRemove));
  };

  const handleAddSameDayCity = () => {
    if (newCityInput.trim() && !sameDayCities.includes(newCityInput.trim())) {
      setSameDayCities([...sameDayCities, newCityInput.trim()]);
    }
    setNewCityInput("");
    setIsSameDayCityModalOpen(false);
  };

  const handleRemoveSameDayCity = (cityToRemove: string) => {
    setSameDayCities(sameDayCities.filter(city => city !== cityToRemove));
  };

  const handleSavePrices = () => {
    setPrices({ ...editPricesInput });
    setIsPriceModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-1 mb-2">
        <h1 className="text-2xl font-medium text-gray-900">Shipping & Pickup Settings</h1>
        <p className="text-gray-500 max-w-2xl text-[15px]">
          Configure your logistics zones, standard fees, and regional delivery preferences for the telecom service areas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Free Shipping Cities Card */}
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="bg-[#F8F9FC] px-6 py-5 flex items-center justify-between border-b border-gray-50">
            <div className="flex items-center gap-3">
              <Gift className="w-5 h-5 text-primary" strokeWidth={2} />
              <h2 className="text-[17px] font-medium text-gray-900">Free Shipping Cities</h2>
            </div>
            <button
              onClick={() => { setNewCityInput(""); setIsFreeCityModalOpen(true); }}
              className="flex items-center gap-1.5 text-primary text-[14px] font-medium hover:underline cursor-pointer"
            >
              <Plus className="w-4 h-4" strokeWidth={2} />
              Add City
            </button>
          </div>
          <div className="p-6 flex-1 flex flex-col gap-5">
            <p className="text-gray-600 leading-relaxed text-[15px]">
              Customers in these specific locations will not be charged any shipping fees regardless of order size.
            </p>
            <div className="flex flex-wrap gap-2">
              {freeShippingCities.map(city => (
                <div key={city} className="bg-[#EBF3FF] text-[#4285F4] px-4 py-2 rounded-full text-[14px] font-semibold flex items-center gap-2">
                  {city}
                  <button onClick={() => handleRemoveFreeCity(city)} className="hover:text-blue-700 transition-colors cursor-pointer">
                    <X className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                </div>
              ))}
              {freeShippingCities.length === 0 && (
                <p className="text-sm text-gray-400 italic">No cities added yet.</p>
              )}
            </div>
          </div>
          <div className="bg-[#F8F9FC] px-6 py-4 text-[14px] text-gray-600 font-medium">
            Currently active for {freeShippingCities.length} {freeShippingCities.length === 1 ? 'city' : 'cities'}
          </div>
        </div>

        {/* General Pricing Card */}
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="bg-[#F8F9FC] px-6 py-5 flex items-center justify-between border-b border-gray-50">
            <div className="flex items-center gap-3">
              <Gift className="w-5 h-5 text-primary" strokeWidth={2} />
              <h2 className="text-[17px] font-medium text-gray-900">General Pricing</h2>
            </div>
            <button
              onClick={() => { setEditPricesInput({ ...prices }); setIsPriceModalOpen(true); }}
              className="flex items-center gap-1.5 text-primary text-[14px] font-medium hover:underline cursor-pointer"
            >
              <PencilLine className="w-4 h-4" strokeWidth={2} />
              Edit Price
            </button>
          </div>
          <div className="p-6 flex-1 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#F4F6F9] p-5 rounded-[16px]">
                <p className="text-[14px] text-gray-600 font-medium mb-1">Standard Pickup</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[22px] font-medium text-gray-900">€{prices.standardPickup.toFixed(2)}</span>
                  <span className="text-[13px] text-gray-500 font-medium">/Order</span>
                </div>
              </div>
              <div className="bg-[#F4F6F9] p-5 rounded-[16px]">
                <p className="text-[14px] text-gray-600 font-medium mb-1">Standard Delivery</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[22px] font-medium text-gray-900">€{prices.standardDelivery.toFixed(2)}</span>
                  <span className="text-[13px] text-gray-500 font-medium">/Order</span>
                </div>
              </div>
            </div>

            <div className="bg-[#EEF6FF] p-4 rounded-[12px] flex gap-3 items-start mt-1">
              <AlertTriangle className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-[14px] text-gray-800 leading-relaxed font-medium">
                Standard pricing applies to all deliveries outside of the designated Free Shipping zones.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Same-Day Delivery Card */}
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-[#F8F9FC] px-6 py-5 flex items-center justify-between border-b border-gray-50">
          <div className="flex items-center gap-3">
            <Gift className="w-5 h-5 text-primary" strokeWidth={2} />
            <h2 className="text-[17px] font-medium text-gray-900">Same-Day Delivery</h2>
          </div>
          <button
            onClick={() => { setEditPricesInput({ ...prices }); setIsPriceModalOpen(true); }}
            className="flex items-center gap-1.5 text-primary text-[14px] font-medium hover:underline cursor-pointer"
          >
            <PencilLine className="w-4 h-4" strokeWidth={2} />
            Manage Prices
          </button>
        </div>
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="space-y-3">
              <label className="text-[15px] font-medium text-gray-800">Delivery Surcharge</label>
              <Input
                readOnly
                value={`€${prices.deliverySurcharge.toFixed(2)}`}
                className="w-full bg-[#F2F2F2] border-none rounded-[12px] h-[52px] text-gray-600 font-medium pointer-events-none px-4"
              />
            </div>
            <div className="md:col-span-2 space-y-3">
              <label className="text-[15px] font-medium text-gray-800">Enabled Cities</label>
              <div className="flex flex-wrap gap-3">
                {sameDayCities.map((city) => (
                  <div key={city} className="bg-[#F4F6F9] group text-gray-700 px-5 py-[14px] rounded-[12px] text-[15px] font-medium flex items-center gap-2">
                    {city}
                    <button
                      onClick={() => handleRemoveSameDayCity(city)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 bg-gray-200 hover:bg-red-100 hover:text-red-500 rounded-full p-0.5 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => { setNewCityInput(""); setIsSameDayCityModalOpen(true); }}
                  className="border-2 border-dashed border-gray-200 text-gray-700 hover:bg-gray-50 px-5 py-[14px] rounded-[12px] text-[15px] font-medium flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-gray-500" strokeWidth={2} />
                  Add City
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}

      {/* Free Shipping City Modal */}
      <Dialog open={isFreeCityModalOpen} onOpenChange={setIsFreeCityModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Free Shipping City</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-right">
                City Name
              </Label>
              <Input
                id="city"
                value={newCityInput}
                onChange={(e) => setNewCityInput(e.target.value)}
                placeholder="e.g. Amsterdam"
                className="col-span-3"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddFreeCity();
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFreeCityModalOpen(false)} className="cursor-pointer">Cancel</Button>
            <Button onClick={handleAddFreeCity} className="bg-primary cursor-pointer">Add City</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Same-Day City Modal */}
      <Dialog open={isSameDayCityModalOpen} onOpenChange={setIsSameDayCityModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Same-Day Delivery City</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="sameday-city" className="text-right">
                City Name
              </Label>
              <Input
                id="sameday-city"
                value={newCityInput}
                onChange={(e) => setNewCityInput(e.target.value)}
                placeholder="e.g. Rotterdam"
                className="col-span-3"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddSameDayCity();
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSameDayCityModalOpen(false)} className="cursor-pointer">Cancel</Button>
            <Button onClick={handleAddSameDayCity} className="bg-primary cursor-pointer">Add City</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Prices Modal */}
      <Dialog open={isPriceModalOpen} onOpenChange={setIsPriceModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Prices</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="standard-pickup">Standard Pickup (€)</Label>
              <Input
                id="standard-pickup"
                type="number"
                step="0.01"
                min="0"
                value={editPricesInput.standardPickup}
                onChange={(e) => setEditPricesInput({ ...editPricesInput, standardPickup: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="standard-delivery">Standard Delivery (€)</Label>
              <Input
                id="standard-delivery"
                type="number"
                step="0.01"
                min="0"
                value={editPricesInput.standardDelivery}
                onChange={(e) => setEditPricesInput({ ...editPricesInput, standardDelivery: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="surcharge">Delivery Surcharge (€)</Label>
              <Input
                id="surcharge"
                type="number"
                step="0.01"
                min="0"
                value={editPricesInput.deliverySurcharge}
                onChange={(e) => setEditPricesInput({ ...editPricesInput, deliverySurcharge: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPriceModalOpen(false)} className="cursor-pointer">Cancel</Button>
            <Button onClick={handleSavePrices} className="bg-primary cursor-pointer">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}