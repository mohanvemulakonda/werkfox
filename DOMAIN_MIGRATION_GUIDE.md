# Domain Migration Guide: WordPress to Vercel

Complete guide to migrate livatosolutions.com from WordPress (Hostinger) to Vercel while keeping crm.livatosolutions.com working.

## Current Setup
- **livatosolutions.com** → WordPress on Hostinger
- **crm.livatosolutions.com** → Vercel (already working)
- **New Next.js site** → Needs to be on livatosolutions.com

## Migration Steps

### Step 1: Add Domain to Vercel (5 minutes)

1. Go to your Vercel Dashboard: https://vercel.com/dashboard
2. Click on your LivatoSolutions project
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Add these domains:
   - `livatosolutions.com`
   - `www.livatosolutions.com`

Vercel will show you DNS records that need to be configured.

### Step 2: Verify Current DNS in Hostinger (Important - Check First!)

Before making changes, verify your current setup:

1. Log into Hostinger
2. Go to **Domains** → Find `livatosolutions.com` → **Manage**
3. Click **DNS / Name Servers**
4. **Take screenshots** of ALL current DNS records
5. Make note of these specific records:
   - **MX Records** (for email - CRITICAL, don't delete!)
   - **TXT Records** (for email verification)
   - **CNAME for crm** (should point to Vercel)
   - **A Record** (currently pointing to WordPress)

### Step 3: Update DNS Records in Hostinger

**⚠️ CRITICAL: Keep these records unchanged:**
- All **MX records** (email delivery)
- All **TXT records** starting with `v=spf1`, `v=DKIM1`, or `_dmarc`
- **CNAME** for `crm` subdomain

**Update these records:**

#### For Root Domain (livatosolutions.com)

**Delete the old A record** that points to WordPress server.

**Add new A record:**
```
Type: A
Name: @ (or leave blank for root domain)
Value: 76.76.21.21
TTL: 3600
```

#### For www Subdomain

**Delete any old A or CNAME** for www.

**Add new CNAME:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

#### For Vercel Domain Verification

Vercel will provide a TXT record for verification. Add it:
```
Type: TXT
Name: _vercel
Value: [Copy from Vercel dashboard]
TTL: 3600
```

#### Keep CRM Subdomain (Should already exist)

Verify this exists (don't change):
```
Type: CNAME
Name: crm
Value: cname.vercel-dns.com
TTL: 3600
```

### Step 4: Final DNS Configuration Example

After changes, your DNS should look like this:

```
# Root domain - Points to Vercel
A Record
Name: @
Value: 76.76.21.21

# WWW - Points to Vercel
CNAME
Name: www
Value: cname.vercel-dns.com

# CRM Subdomain - Points to Vercel (your CRM app)
CNAME
Name: crm
Value: cname.vercel-dns.com

# Email MX Records (KEEP THESE - Don't touch!)
MX Record
Name: @
Value: mx1.hostinger.com
Priority: 10

MX Record
Name: @
Value: mx2.hostinger.com
Priority: 10

# Email TXT Records (KEEP THESE)
TXT Record
Name: @
Value: v=spf1 include:_spf.hostinger.com ~all

# Vercel Verification
TXT Record
Name: _vercel
Value: [from Vercel]

# Any other existing TXT records for email (DKIM, DMARC)
```

### Step 5: Verify in Vercel

1. After updating DNS in Hostinger, go back to Vercel
2. Click **Verify** next to your domain
3. If verification fails, wait 5-10 minutes and try again (DNS propagation)
4. Once verified, Vercel will automatically provision SSL certificate

### Step 6: Test Before Full Migration (Recommended)

**Test using hosts file** (so only you see the new site):

**On Mac/Linux:**
```bash
sudo nano /etc/hosts
```

**On Windows:**
```
notepad C:\Windows\System32\drivers\etc\hosts
```

Add this line:
```
76.76.21.21 livatosolutions.com
```

Now visit livatosolutions.com in your browser - you'll see the Vercel version while others still see WordPress.

Test thoroughly:
- All pages load correctly
- Contact form works
- Label Finder works
- Images display properly
- Mobile responsive

When done testing, remove that line from hosts file.

### Step 7: Wait for DNS Propagation (24-48 hours)

- DNS changes take time to propagate globally
- Use https://dnschecker.org to check propagation
- Enter `livatosolutions.com` and check if it resolves to `76.76.21.21`

### Step 8: Monitor After Migration

**First 48 hours:**
1. Check website loads: livatosolutions.com
2. Check www redirect: www.livatosolutions.com → livatosolutions.com
3. Check HTTPS works (Vercel auto-enables)
4. Test contact form email delivery
5. Verify CRM still works: crm.livatosolutions.com

**If email stops working:**
- Check MX records in Hostinger DNS
- Verify TXT records for SPF/DKIM exist
- Test by sending email to info@livatosolutions.com

### Step 9: Disable WordPress (After 1 week)

Only after confirming everything works:

1. In Hostinger, go to **Hosting** → **Manage**
2. You can either:
   - **Option A:** Delete WordPress installation
   - **Option B:** Keep it as backup, just remove public access
3. Cancel WordPress hosting plan if you want to save money

---

## Troubleshooting

### Domain not verifying in Vercel
- Wait 10-30 minutes after DNS changes
- Clear browser cache
- Check DNS propagation: https://dnschecker.org
- Verify you copied Vercel's values exactly

### Email stops working
- You likely deleted MX records by mistake
- Re-add MX records from your screenshots
- Contact Hostinger support for correct email DNS records

### CRM subdomain stops working
- Verify CNAME for `crm` points to `cname.vercel-dns.com`
- Check in Vercel that crm.livatosolutions.com is listed under project domains

### Website shows "This site can't be reached"
- DNS hasn't propagated yet (wait longer)
- A record might be incorrect (should be 76.76.21.21)
- Use https://dnschecker.org to verify

### Mixed content / Not secure warnings
- Vercel automatically provisions SSL
- If you see warnings, check that all resources use HTTPS
- Clear browser cache and cookies

---

## Rollback Plan (Emergency)

If something goes wrong, you can quickly rollback:

1. In Hostinger DNS, change A record back to WordPress IP
2. The old WordPress IP should be in your screenshots
3. DNS will take 10-30 minutes to propagate back
4. Your WordPress site will be live again

**To find WordPress IP** (if you lost it):
```bash
ping livatosolutions.com
```
Do this BEFORE making DNS changes to note the current IP.

---

## Summary Checklist

- [ ] Take screenshots of current Hostinger DNS
- [ ] Note current WordPress IP address
- [ ] Add livatosolutions.com to Vercel project
- [ ] Update A record for root domain to 76.76.21.21
- [ ] Add CNAME for www to cname.vercel-dns.com
- [ ] Add _vercel TXT record for verification
- [ ] Verify MX records are still present
- [ ] Verify email TXT records (SPF, DKIM) still present
- [ ] Verify crm CNAME is still present
- [ ] Wait for DNS propagation (24-48 hours)
- [ ] Test on livatosolutions.com
- [ ] Test email delivery
- [ ] Verify crm.livatosolutions.com still works
- [ ] Monitor for 1 week
- [ ] Disable WordPress after confirmation

---

## Important Notes

1. **Email will continue working** as long as you keep MX records
2. **CRM will continue working** as long as CNAME for crm exists
3. **Downtime should be minimal** (just DNS propagation time)
4. **Vercel provides free SSL** automatically
5. **Changes are reversible** - you can rollback if needed

---

## Need Help?

- **Vercel Support:** https://vercel.com/support
- **Hostinger Support:** https://www.hostinger.com/cpanel-login (live chat)
- **DNS Checker:** https://dnschecker.org
- **What's My DNS:** https://www.whatsmydns.net

---

**Good luck with your migration! 🚀**
