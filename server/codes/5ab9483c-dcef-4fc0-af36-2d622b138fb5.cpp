#include <bits/stdc++.h> 
using namespace std;

int bitFlipCount(long long int p, long long int q, long long int r) {
    long long int xorResult = p ^ q; 
    int count = 0;

    while (xorResult > 0 || r > 0) {
        if ((xorResult & 1) != (r & 1)) {
            count++;
        }
        xorResult >>= 1; 
        r >>= 1;
    }

    return count;
}

int main()
{
    long long int p, q, r;
    cin >> p >> q >> r;
    cout<<bitFlipCount(p,q,r)<<endl;
    return 0;
}