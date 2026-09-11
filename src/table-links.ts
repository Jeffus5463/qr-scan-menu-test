type AddressResult =
  | { origin: string; error: null }
  | { origin: null; error: string };

export function validateBaseAddress(value: string): AddressResult {
  const address = value.trim();
  if (!address) {
    return {
      origin: null,
      error: "Enter the laptop’s network address to create your table cards.",
    };
  }
  if (address.length > 250 || /\s|\\/.test(address)) {
    return {
      origin: null,
      error: "Enter a plain HTTP address without spaces or backslashes.",
    };
  }
  if (!/^http:\/\//i.test(address)) {
    return {
      origin: null,
      error:
        "Start with http:// and include the port, for example http://192.168.1.103:5173.",
    };
  }

  let url: URL;
  try {
    url = new URL(address);
  } catch {
    return {
      origin: null,
      error:
        "This address is incomplete or invalid. Use the laptop’s IPv4 address and port.",
    };
  }

  const host = url.hostname.toLowerCase().replace(/\.$/, "");
  const localOnly =
    host === "localhost" ||
    host.endsWith(".localhost") ||
    /^(127|0)\./.test(host) ||
    host === "[::1]" ||
    host === "[::]" ||
    /^\[::ffff:(7f[0-9a-f]{2}:|0:0\])/.test(host);

  if (localOnly) {
    return {
      origin: null,
      error:
        "Phones cannot use localhost, loopback, or 0.0.0.0. Enter the laptop’s LAN IPv4 address instead.",
    };
  }
  if (url.username || url.password) {
    return {
      origin: null,
      error: "Use an address without a username or password.",
    };
  }
  if (url.pathname !== "/" || url.search || url.hash) {
    return {
      origin: null,
      error:
        "Enter only the base address and port. Remove /menu, /tables, query parameters, and fragments.",
    };
  }
  if (/^(22[4-9]|23\d|24\d|25[0-5])\./.test(host)) {
    return {
      origin: null,
      error:
        "Use the laptop’s individual LAN address, not a multicast or broadcast address.",
    };
  }
  return { origin: url.origin, error: null };
}

export function createTableUrl(origin: string, table: number): string {
  const url = new URL("/menu", origin);
  url.searchParams.set("table", String(table));
  return url.href;
}
