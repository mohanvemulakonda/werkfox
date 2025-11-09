# Hostinger DNS Setup for Vercel

Follow these exact steps to point livatosolutions.com to Vercel.

## Step 1: Delete Existing Records

In Hostinger DNS management, **DELETE** these records:

1. **Delete A record:** @ → 84.32.84.32
2. **Delete CNAME:** www → livatosolutions.com

Keep all the CAA records (they're fine for SSL).

## Step 2: Add Vercel DNS Records

### Add A Record for Root Domain

Click **"Add Record"** and enter:

```
Type: A
Name: @ (or leave blank)
Points to: 76.76.21.21
TTL: 14400
```

Click **Save** or **Add Record**

### Add CNAME for www

Click **"Add Record"** again and enter:

```
Type: CNAME
Name: www
Points to: cname.vercel-dns.com
TTL: 14400
```

Click **Save** or **Add Record**

### Add CNAME for CRM subdomain

Click **"Add Record"** again and enter:

```
Type: CNAME
Name: crm
Points to: cname.vercel-dns.com
TTL: 14400
```

Click **Save** or **Add Record**

## Step 3: Add Email DNS Records (IMPORTANT!)

You need these for email to work at info@livatosolutions.com:

### MX Records (Priority 5)

Click **"Add Record"**:
```
Type: MX
Name: @ (or leave blank)
Priority: 5
Points to: mx1.hostinger.com
TTL: 14400
```

### MX Records (Priority 10)

Click **"Add Record"**:
```
Type: MX
Name: @ (or leave blank)
Priority: 10
Points to: mx2.hostinger.com
TTL: 14400
```

### SPF Record (TXT)

Click **"Add Record"**:
```
Type: TXT
Name: @ (or leave blank)
Points to: v=spf1 include:_spf.mail.hostinger.com ~all
TTL: 3600
```

### DMARC Record (TXT)

Click **"Add Record"**:
```
Type: TXT
Name: _dmarc
Points to: v=DMARC1; p=none
TTL: 3600
```

### DKIM Records (CNAME) - 3 Records Needed

**DKIM Record 1:**
```
Type: CNAME
Name: hostingermail-a._domainkey
Points to: hostingermail-a.dkim.mail.hostinger.com
TTL: 300
```

**DKIM Record 2:**
```
Type: CNAME
Name: hostingermail-b._domainkey
Points to: hostingermail-b.dkim.mail.hostinger.com
TTL: 300
```

**DKIM Record 3:**
```
Type: CNAME
Name: hostingermail-c._domainkey
Points to: hostingermail-c.dkim.mail.hostinger.com
TTL: 300
```

### Email Autodiscover (CNAME)

```
Type: CNAME
Name: autodiscover
Points to: autodiscover.mail.hostinger.com
TTL: 300
```

### Email Autoconfig (CNAME)

```
Type: CNAME
Name: autoconfig
Points to: autoconfig.mail.hostinger.com
TTL: 300
```

## Step 4: Verify in Vercel

1. Go to https://vercel.com/dashboard
2. Select your LivatoSolutions project
3. Go to **Settings** → **Domains**
4. Add these domains (if not already added):
   - livatosolutions.com
   - www.livatosolutions.com
   - crm.livatosolutions.com
5. Click **Verify** on each domain
6. Wait 5-10 minutes and click **Refresh** if needed

## Step 5: Wait for DNS Propagation

- Changes take 15 minutes to 24 hours
- Usually takes 1-4 hours
- Check progress: https://dnschecker.org
- Search for: livatosolutions.com
- Should show IP: 76.76.21.21

## Final DNS Configuration Summary

After completing all steps, you should have:

```
A Records:
@ → 76.76.21.21

CNAME Records:
www → cname.vercel-dns.com
crm → cname.vercel-dns.com
hostingermail-a._domainkey → hostingermail-a.dkim.mail.hostinger.com
hostingermail-b._domainkey → hostingermail-b.dkim.mail.hostinger.com
hostingermail-c._domainkey → hostingermail-c.dkim.mail.hostinger.com
autodiscover → autodiscover.mail.hostinger.com
autoconfig → autoconfig.mail.hostinger.com

MX Records:
@ → mx1.hostinger.com (Priority: 5)
@ → mx2.hostinger.com (Priority: 10)

TXT Records:
@ → "v=spf1 include:_spf.mail.hostinger.com ~all"
_dmarc → "v=DMARC1; p=none"

CAA Records:
(Keep all existing CAA records for SSL)
```

## Troubleshooting

### If site doesn't load after 24 hours:
1. Verify A record shows 76.76.21.21
2. Check https://dnschecker.org
3. Clear browser cache
4. Try incognito/private window

### If email stops working:
1. Verify all MX records exist
2. Check TXT records for SPF/DMARC
3. Verify all DKIM CNAME records exist

### If www doesn't work:
1. Verify CNAME: www → cname.vercel-dns.com
2. Check in Vercel that www.livatosolutions.com is added

### If CRM doesn't work:
1. Verify CNAME: crm → cname.vercel-dns.com
2. Check in Vercel that crm.livatosolutions.com is added
3. Make sure CRM project is deployed on Vercel

## Quick Test Commands

**Check DNS resolution:**
```bash
nslookup livatosolutions.com
```
Should show: 76.76.21.21

**Check www:**
```bash
nslookup www.livatosolutions.com
```
Should show: cname.vercel-dns.com

**Check MX records:**
```bash
nslookup -type=mx livatosolutions.com
```
Should show: mx1.hostinger.com and mx2.hostinger.com

---

✅ After completing these steps, your site will be live on Vercel with working email!
