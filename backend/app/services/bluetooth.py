# Bluetooth Integration Service using Bleak
import asyncio
from bleak import BleakScanner, BleakClient

async def discover_bluetooth_devices():
    """Discover nearby Bluetooth devices."""
    devices = await BleakScanner.discover()
    return [{"name": d.name, "address": d.address} for d in devices]

async def connect_to_bluetooth_device(device_address):
    """Connect to a Bluetooth device using its address."""
    client = BleakClient(device_address)
    try:
        await client.connect()
        return client
    except Exception as e:
        print(f"Failed to connect to {device_address}: {e}")
        return None

async def read_weight_from_device(client):
    """Read weight data from the connected Bluetooth device."""
    try:
        # Replace `characteristic_uuid` with the UUID of the Bluetooth characteristic for weight data
        characteristic_uuid = "your-characteristic-uuid"
        data = await client.read_gatt_char(characteristic_uuid)
        return float(data.decode('utf-8').strip())
    except Exception as e:
        print(f"Failed to read data: {e}")
        return None
