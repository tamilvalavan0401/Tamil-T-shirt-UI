

export interface Address {
  id: string
  firstName: string
  lastName: string
  country: string
  city: string
  state: string
  pinCode: string
  doorNoStreet: string
  localityTownDistrict: string
  email: string
  phone: string
  saveAs: "Home" | "Office" | "Other"
}

const ADDRESS_STORAGE_KEY = "user_addresses"

export const getAddresses = (): Address[] => {
  if (typeof window === "undefined") {
    return []
  }
  const storedAddresses = localStorage.getItem(ADDRESS_STORAGE_KEY)
  return storedAddresses ? JSON.parse(storedAddresses) : []
}

export const saveAddresses = (addresses: Address[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(addresses))
  }
}

export const addAddress = (newAddress: Address): Address[] => {
  const addresses = getAddresses()
  const updatedAddresses = [...addresses, newAddress]
  saveAddresses(updatedAddresses)
  return updatedAddresses
}

export const updateAddress = (updatedAddress: Address): Address[] => {
  const addresses = getAddresses()
  const updatedAddresses = addresses.map((addr) => (addr.id === updatedAddress.id ? updatedAddress : addr))
  saveAddresses(updatedAddresses)
  return updatedAddresses
}

export const deleteAddress = (addressId: string): Address[] => {
  const addresses = getAddresses()
  const updatedAddresses = addresses.filter((addr) => addr.id !== addressId)
  saveAddresses(updatedAddresses)
  return updatedAddresses
}
